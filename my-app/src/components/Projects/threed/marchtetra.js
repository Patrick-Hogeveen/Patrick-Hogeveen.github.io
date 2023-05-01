import { BufferAttribute, BufferGeometry, Matrix4, Vector3 } from 'three'
import { mergeBufferGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils'
import { MathUtils } from 'three'
import {createNoise3D} from 'simplex-noise'
import { triangulationTable, cubeVertices, cornerIndexAFromEdge, cornerIndexBFromEdge } from './triangulation'
import memoize from 'fast-memoize'
import { clamp } from 'three/src/math/MathUtils'
import alea from 'alea'

const cube_vertices = [
    [0,0,0]
  , [1,0,0]
  , [1,1,0]
  , [0,1,0]
  , [0,0,1]
  , [1,0,1]
  , [1,1,1]
  , [0,1,1] ].map((x) => new Vector3(...(x)))
, tetra_list = [
    [0,2,3,7]
  , [0,6,2,7]
  , [0,4,6,7]
  , [0,6,1,2]
  , [0,1,6,4]
  , [5,6,1,4] ]
, tetra_list2 = [
    [0,6,3,7]
  , [0,2,6,3]
  , [0,4,6,7]
  , [0,6,5,4]
  , [0,6,1,5]
  , [0,6,1,2]
]
, tetra_list3 = [
  [7,3,4,2]
, [4,2,0,3]
, [7,4,6,2]
, [6,5,4,2]
, [4,5,2,1]
, [4,2,1,0]
];
;



export class MarchTetra extends BufferGeometry {
    constructor({grid}, data, surfaceLevel, smooth) {
      super()
      this.data = data
      this.surfaceLevel = surfaceLevel
      this.smooth = smooth

      this.build({grid})
  }

  build = ({grid}) => {
    console.log('tetra')
    var x=0, y=0, z=0, faces=[], vertexs=[]

        function interp (i1, i2) {

            var g0 = grid[i1]
            , g1 = grid[i2]
            , p0 = cubeVertices[i1].clone()//.multiplyScalar(0.5)
            , p1 = cubeVertices[i2].clone()//.multiplyScalar(0.5)
            , v  = [x, y, z]
            , t = g0 - g1
            , midpoint = new Vector3();
            //p0.subScalar(0.5)
            //p1.subScalar(0.5)
            if(Math.abs(t) > 1e-6) {
            t = (g0 / t)*0.5;
            }
            /*
            for(var i=0; i<3; ++i) {
              var test= p0[i];
              v[i] += p0[i] + t * (p1[i] - p0[i]);
            }
            */
           v[0] = p0.x + t * (p1.x - p0.x)
           v[1] = p0.y + t * (p1.y - p0.y)
           v[2] = p0.z + t * (p1.z - p0.z)
           if(v[1]==0 && v[0] == 0 && [2]==0){
            console.log('heck')
           }
            midpoint.lerpVectors(p0,p1,t)
            vertexs.push(...v);
            return vertexs.length - 1;
        }

    console.log(grid)
    for(var i =0; i<1;i++){
      var T = tetra_list[i],
      triindex = 0;
      if (grid[T[0]] > 0) triindex |= 1;
      if (grid[T[1]] > 0) triindex |= 2;
      if (grid[T[2]] > 0) triindex |= 4;
      if (grid[T[3]] > 0) triindex |= 8;
      console.log(triindex)
      switch (triindex) {
        case 0x00:
        case 0x0F:
        break;
        case 0x0E:
          faces.push([ 
              interp(T[0], T[1])
            , interp(T[0], T[3]) 
            , interp(T[0], T[2]) ]);
        break;
        case 0x01:
          faces.push([ 
              interp(T[0], T[1])
            , interp(T[0], T[2])
            , interp(T[0], T[3])  ]);
        break;
        case 0x0D:
          faces.push([ 
              interp(T[1], T[0])
            , interp(T[1], T[2]) 
            , interp(T[1], T[3]) ]);
        break;
        case 0x02:
          faces.push([ 
              interp(T[1], T[0])
            , interp(T[1], T[3])
            , interp(T[1], T[2]) ]);
        break;
        case 0x0C:
          faces.push([ 
                interp(T[1], T[2])
              , interp(T[1], T[3])
              , interp(T[0], T[3])
              , interp(T[0], T[2]) ]);
        break;
        case 0x03:
          faces.push([ 
                interp(T[1], T[2])
              , interp(T[0], T[2])
              , interp(T[0], T[3])
              , interp(T[1], T[3]) ]);
        break;
        case 0x04:
          faces.push([ 
                interp(T[2], T[0])
              , interp(T[2], T[1])
              , interp(T[2], T[3]) ]);
        break;
        case 0x0B:
          faces.push([ 
                interp(T[2], T[0])
              , interp(T[2], T[3]) 
              , interp(T[2], T[1]) ]);
        break;
        case 0x05:
          faces.push([ 
                interp(T[0], T[1])
              , interp(T[1], T[2])
              , interp(T[2], T[3])
              , interp(T[0], T[3]) ]);
        break;
        case 0x0A:
          faces.push([ 
                interp(T[0], T[1])
              , interp(T[0], T[3])
              , interp(T[2], T[3])
              , interp(T[1], T[2]) ]);
        break;
        case 0x06:
          faces.push([ 
                interp(T[2], T[3])
              , interp(T[0], T[2])
              , interp(T[0], T[1])
              , interp(T[1], T[3]) ]);
        break;
        case 0x09:
          faces.push([ 
                interp(T[2], T[3])
              , interp(T[1], T[3])
              , interp(T[0], T[1])
              , interp(T[0], T[2]) ]);
        break;
        case 0x07:
          faces.push([ 
                interp(T[3], T[0])
              , interp(T[3], T[1])
              , interp(T[3], T[2]) ]);
        break;
        case 0x08:
          faces.push([ 
                interp(T[3], T[0])
              , interp(T[3], T[2])
              , interp(T[3], T[1]) ]);
        break;
      }
      /*
      switch (triindex) {
        case 0x00:
        case 0x0F:
        break;
        case 0x0E:
          faces.push( 
              interp(T[0], T[1])
            , interp(T[0], T[3]) 
            , interp(T[0], T[2]) );
        break;
        case 0x01:
          faces.push( 
              interp(T[0], T[1])
            , interp(T[0], T[2])
            , interp(T[0], T[3])  );
        break;
        case 0x0D:
          faces.push( 
              interp(T[1], T[0])
            , interp(T[1], T[2]) 
            , interp(T[1], T[3]) );
        break;
        case 0x02:
          faces.push( 
              interp(T[1], T[0])
            , interp(T[1], T[3])
            , interp(T[1], T[2]) );
        break;
        case 0x0C:
          faces.push( 
                interp(T[1], T[2])
              , interp(T[0], T[3])
              , interp(T[0], T[2]) );
          faces.push( 
                interp(T[1], T[2])
              , interp(T[1], T[3])
              , interp(T[0], T[3]) );
        break;
        case 0x03:
          faces.push( 
                interp(T[1], T[2])
              , interp(T[0], T[3])
              , interp(T[1], T[3]) );
              faces.push( 
                interp(T[1], T[2])
              , interp(T[0], T[2])
              , interp(T[0], T[3]) );
        break;
        case 0x04:
          faces.push( 
                interp(T[2], T[0])
              , interp(T[2], T[1])
              , interp(T[2], T[3]) );
        break;
        case 0x0B:
          faces.push( 
                interp(T[2], T[0])
              , interp(T[2], T[3]) 
              , interp(T[2], T[1]) );
        break;
        case 0x05:
          faces.push( 
                interp(T[0], T[1])
              , interp(T[2], T[3])
              , interp(T[0], T[3]) );
          faces.push( 
                interp(T[0], T[1])
              , interp(T[1], T[2])
              , interp(T[2], T[3]) );
        break;
        case 0x0A:
          faces.push( 
                interp(T[0], T[1])
              , interp(T[2], T[3])
              , interp(T[1], T[2]) );
          faces.push( 
                interp(T[0], T[1])
              , interp(T[0], T[3])
              , interp(T[2], T[3]) );
        break;
        case 0x06:
          faces.push( 
                interp(T[2], T[3])
              , interp(T[0], T[1])
              , interp(T[1], T[3]) );
              faces.push( 
                interp(T[2], T[3])
              , interp(T[0], T[2])
              , interp(T[0], T[1]) );
        break;
        case 0x09:
          faces.push( 
                interp(T[2], T[3])
              , interp(T[0], T[1])
              , interp(T[0], T[2]) );
          faces.push( 
                interp(T[2], T[3])
              , interp(T[1], T[3])
              , interp(T[0], T[1]) );
        break;
        case 0x07:
          faces.push( 
                interp(T[3], T[0])
              , interp(T[3], T[1])
              , interp(T[3], T[2]) );
        break;
        case 0x08:
          faces.push( 
                interp(T[3], T[0])
              , interp(T[3], T[2])
              , interp(T[3], T[1]) );
        break;
      }*/
    }
    console.log('end')
    console.log(vertexs)
    console.log(faces)
    this.setAttribute('position', new BufferAttribute(new Float32Array(vertexs), 3))
  }
}

const simplex = new createNoise3D(alea('seed'))

const pointInSphere = (point) => {
  const rad = 2
  const spherePos = new Vector3(0,0,0)
  const diff = new Vector3().subVectors(spherePos, point)
  const dist = diff.length()
  return dist < rad
}

const getNoiseAtPoint = memoize((x,y,z) => {
  return simplex(x,y,z) 
})

export default class MarchTetras extends BufferGeometry {
    constructor(size, surfaceLevel, scale=0.05, position=[0,0,0]) {
        super()
        this.size = size
        this._surfaceLevel = surfaceLevel
        this._scale = scale
        this.position = new Vector3(...position)
        this.build()
    }

    

    build() {

        var grid = new Float32Array(8), x=0, y=0, z=0, faces=[], vertexs=[]

        function interp (i1, i2) {
            var g0 = grid[i1]
            , g1 = grid[i2]
            , p0 = cube_vertices[i1]
            , p1 = cube_vertices[i2]
            , v  = [x, y, z]
            , t = g0 - g1;
            if(Math.abs(t) > 1e-6) {
            t = g0 / t;
            }
            v[0] = p0.x + t * (p1.x - p0.x)
           v[1] = p0.y + t * (p1.y - p0.y)
           v[2] = p0.z + t * (p1.z - p0.z)
            vertexs.push(...v);
            return vertexs.length - 1;
        }
        const geometries = []

        const p = new Vector3()
        const m = new Matrix4()
        var test_n=0
        for (x=0; x<this.size[0]; x++){
            for (y=0; y<this.size[1];y++){
                for (z=0; z<this.size[2];z++) {
                    p.set(x,y,z)
                    p.add(this.position)

                    const vertexWorldPosition = new Vector3()
                    var data = new Float32Array(8)
                    for(var j=0;j<8;j++){
                      vertexWorldPosition.copy(cube_vertices[j]).add(p)
                      data[j] = getNoiseAtPoint(...vertexWorldPosition.multiplyScalar(this._scale))
                    }
                    /*
                    const data = cubeVertices.map((vertex) => {
                      vertexWorldPosition.copy(vertex).add(p)
          
                      return getNoiseAtPoint(...vertexWorldPosition.multiplyScalar(this._scale))
                    })
                    */
                    let cubeIndex = 0
                    var sum = 0
                    grid.forEach(item => {
                      sum+=item
                    })
                    if (sum>0){
                      console.log(grid)
                    }
                    const g = new MarchTetra({data}, 1, this._surfaceLevel,this.smooth)
                    geometries.push(g)

                      //
                      
                }
            }
        }
        console.log(vertexs)
        console.log(test_n)
        let merged = mergeBufferGeometries(geometries,1)
        merged = mergeVertices(merged)

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