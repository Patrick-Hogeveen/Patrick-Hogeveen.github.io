import { BufferAttribute, BufferGeometry, Matrix4, Vector3 } from 'three'
import { mergeBufferGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils'
import { MathUtils } from 'three'
import {createNoise3D} from 'simplex-noise'
import { triangulationTable, cubeVertices, cornerIndexAFromEdge, cornerIndexBFromEdge } from './triangulation'
import memoize from 'fast-memoize'
import alea from 'alea'



export class MarchCube extends BufferGeometry {
    constructor(cubeIndex, data, surfaceLevel, smooth) {
        super()
        this.data = data
        this.surfaceLevel = surfaceLevel
        this.smooth = smooth

        this.build(cubeIndex)
    }

    build = (cubeIndex) => {

      
      const triangulation = triangulationTable[cubeIndex]
      let tris = []

      const midPoint = new Vector3()

      for (const edgeIndex of triangulation) {
        if (edgeIndex === -1) continue

        const vertexA = cubeVertices[cornerIndexAFromEdge[edgeIndex]]
        const vertexB = cubeVertices[cornerIndexBFromEdge[edgeIndex]]

        const valueAtVertexA = this.data?.[cornerIndexAFromEdge[edgeIndex]] ?? 1
        const valueAtVertexB = this.data?.[cornerIndexBFromEdge[edgeIndex]] ?? 1
        //Smooths mesh, pulls mesh towards stronger value based on surface level
        const t = this.smooth
          ? MathUtils.inverseLerp(valueAtVertexA, valueAtVertexB, this.surfaceLevel)
          : 0.5

        midPoint.lerpVectors(vertexA, vertexB, t)

        tris = [...tris, ...midPoint]
      }
      //console.log(tris)
      this.setAttribute('position', new BufferAttribute(new Float32Array(tris), 3))
    }
}

const simplex = new createNoise3D(alea('seed'))
//Not in use
const pointInSphere = (point) => {
  const rad = 2
  const spherePos = new Vector3(0,0,0)
  const diff = new Vector3().subVectors(spherePos, point)
  const dist = diff.length()
  return dist < rad
}
//Not in use, data generation function now passed in
const getNoiseAtPoint = memoize((x,y,z) => {
  return simplex(x,y,z) 
})


export default class MarchCubes extends BufferGeometry {
  constructor(size, data_func, smooth, surfaceLevel, scale=0.05, position=[0,0,0]) {
    super()
    this.size = size
    this.data_func = data_func
    this._surfaceLevel = surfaceLevel
    this._smooth = smooth
    this._scale = scale
    this.position = new Vector3(...position)
    this.build()
  }

  build() {
    
    const geometries = []

    const p = new Vector3(0, 0, 0)
    const m = new Matrix4()

    for (let x=0; x<this.size[0]; x++){
      for (let y=0; y<this.size[1]; y++){
        for (let z=0; z<this.size[2]; z++){
          p.set(x, y, z)
          p.add(this.position)

          const vertexWorldPosition = new Vector3()
          //Samples cube vertices and sets each as on or off depending on given surface level
          
          const data = cubeVertices.map((vertex) => {
            vertexWorldPosition.copy(vertex).add(p)
            
            return this.data_func(...vertexWorldPosition.multiplyScalar(this._scale))//getNoiseAtPoint(...vertexWorldPosition.multiplyScalar(this._scale))
          })
          if (data[0]==0){
            console.log('bad cube')
          }
          let cubeIndex = 0

          data.forEach((d, i) => {
            if (d > this._surfaceLevel) {
              cubeIndex |= 1 << i
            }
          })
          //Generates one cube mesh given the cube vertices, index and surface level
          const g = new MarchCube(cubeIndex, data, this._surfaceLevel, this._smooth)

          m.identity()
          
          m.setPosition(p)
          
          g.applyMatrix4(m)
          geometries.push(g)

        }
      }
    }
    //console.log(geometries)
    let merged = mergeBufferGeometries(geometries, 1)
    merged = mergeVertices(merged)
    //Shifts generated mesh within world to align with center
    const _p = new Vector3(
      -this.size[0] / 2 + 0.5,
      -this.size[1] / 2 + 0.5,
      -this.size[2] / 2 + 0.5
    )

    const _m = new Matrix4()

    _m.setPosition(_p)
    merged.applyMatrix4(_m)

    Object.assign(this, merged)

    this.computeVertexNormals(true)
  }
}