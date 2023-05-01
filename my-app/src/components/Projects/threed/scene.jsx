import React, {  useState } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import {createNoise2D, createNoise3D} from 'simplex-noise'

import alea from 'alea'

import { OrbitControls } from '@react-three/drei'
import {  DoubleSide,  Vector3 } from 'three'
import create from 'zustand'

import { Debug } from './debug'
import MarchCubes, { MarchCube } from './march'
import  MarchTetras, { MarchTetra } from './marchtetra'
import {
    useControls,
    button,
    folder,
    Leva,
    useCreateStore 
  } from "leva";

extend({ MarchCubes, MarchCube, MarchTetras, MarchTetra})

export const useStore = create(() => ({
    cubeIndex: 8
}))

function SingleCube({debug, position, initialCubeIndex = 0, intialGrid= new Int32Array([0,0,0,1,0,0,0,0])}) {
  const [cubeIndex, setCubeIndex] = useState(initialCubeIndex)
  const [grid, setGrid] = useState(intialGrid)
  return (
    <mesh position={position}>
      {debug && <Debug cubeIndex={cubeIndex} onCubeIndexChange={setCubeIndex} onChangeGrid={setGrid} grid={grid} />}
      
      <marchCube debug args={[cubeIndex]} />
      <meshBasicMaterial color="#ff005b" side={DoubleSide} />
    </mesh>
  )
}

function GenerateData(size, shape, position, scale){
  if (shape==="noise"){
    const simplex = new createNoise3D(alea('seed'))
    
    return simplex
    
    

  }
  else if (shape==="sphere"){
    function pointInSphere(x,y,z) {
      const rad = ((size[0]-1)*scale)/2
      const point = new Vector3(x,y,z)
      const spherePos = new Vector3(position).add(new Vector3(size[0]/2,size[1]/2,size[2]/2).multiplyScalar(scale))
      const diff = new Vector3().subVectors(spherePos, point)
      const dist = Math.abs(diff.length())
      if (dist >rad){
        return 0
      } else {
        return 1
      }
      
      }
    return pointInSphere
  }
  else if (shape==="terrain"){
    const simplex = new createNoise2D(alea('seed'))

    function terrain(x,y,z){
      var point_val = simplex(x,z)+1
      if(point_val>y){
        return 1
      } else {
        return 0
      }
      
    }
    return terrain
    
  }
}



//Rename this, both tetra and cube are referenced within
function MarchingCubes({debug, shape, size, position, smooth, surfaceLevel, scale}) {

      const data_func = GenerateData(size,shape,position,scale*0.01)
      
      console.log(debug)
      return (
        <>  
            
            
            <mesh>
                {/*select=="cube" ? <>{debug==true ? <SingleCube debug initialCubeIndex={8} /> : <marchCubes args={[size, smooth, surfaceLevel, scale*0.01, position]} />} </> : <>{debug==true ? <SingleTetra debug initialCubeIndex={8} /> : <marchTetras args={[size, surfaceLevel, scale*0.01, position]} />} </>*/}
                {debug ? (
          <SingleCube debug initialCubeIndex={8} />
        ) : (
          <>
            <marchCubes args={[size, data_func, smooth, surfaceLevel, scale*0.01, position, shape]} />
          </>
        )}
                <meshNormalMaterial color="white" side={DoubleSide} />
            </mesh>
        
        </>
      )
}

function Scene() {


        const [{ size, shape, surfaceLevel, smooth, scale, debug }, set] = useControls(
          "Box",
          () => ({
          
          debug: false,
          shape : {options : ["noise","sphere", "terrain"]},
          size: {
              value : [64, 16, 64]
          },
          surfaceLevel: {
            min: -1,
            max: 1,
            step: 0.001,
            value: 0.4
          },
          smooth: true,
          scale: {
            min: 1,
            step: 1,
            max: 10,
            value: 2
          },
          reset: button(() => {
              set({
                  surfaceLevel: 0.4,
                  smooth: true,
                  scale: 2
              })
          })
        })
      )
        //This seems like a very bad way of styling the leva console but I could not find a better one so ¯\_(ツ)_/¯
      const colorsStore = useCreateStore();
        const radiiStore = useCreateStore();
        const spaceStore = useCreateStore();
        const fontSizesStore = useCreateStore();
        const sizesStore = useCreateStore();
        const borderWidthsStore = useCreateStore();
        const fontWeightsStore = useCreateStore();
      
        const colors = useControls(
          {
            colors: folder({
              elevation1: "#458588",
              elevation2: "#000000",
              elevation3: "#373C4B",
              accent1: "#ffffff",
              accent2: "#b8bb26",
              accent3: "#3C93FF",
              highlight1: "#535760",
              highlight2: "#8C92A4",
              highlight3: "#FEFEFE",
              vivid1: "#ffcc00"
            })
          },
          { store: colorsStore }
        );
      
        const radii = useControls(
          {
            radii: folder({
              xs: "0px",
              sm: "0px",
              lg: "0px"
            })
          },
          { store: radiiStore }
        );
      
        const space = useControls(
          {
            space: folder({
              sm: "6px",
              md: "10px",
              rowGap: "7px",
              colGap: "7px"
            })
          },
          { store: spaceStore }
        );
      
        const fontSizes = useControls(
          {
            fontSizes: folder({
              root: "11px"
            })
          },
          { store: fontSizesStore }
        );
      
        const sizes = useControls(
          {
            sizes: folder({
              rootWidth: "280px",
              controlWidth: "160px",
              scrubberWidth: "8px",
              scrubberHeight: "16px",
              rowHeight: "24px",
              folderHeight: "20px",
              checkboxSize: "16px",
              joystickWidth: "100px",
              joystickHeight: "100px",
              colorPickerWidth: "160px",
              colorPickerHeight: "100px",
              monitorHeight: "60px",
              titleBarHeight: "39px"
            })
          },
          { store: sizesStore }
        );
      
        const borderWidths = useControls(
          {
            borderWidths: folder({
              root: "100px",
              input: "1px",
              focus: "1px",
              hover: "1px",
              active: "1px",
              folder: "1px"
            })
          },
          { store: borderWidthsStore }
        );
      
        const fontWeights = useControls(
          {
            fontWeights: folder({
              label: { value: "normal", options: ["bold", "light"] },
              folder: { value: "normal", options: ["bold", "light"] },
              button: { value: "normal", options: ["bold", "light"] }
            })
          },
          { store: fontWeightsStore }
        );
      
        const theme = {
          colors,
          radii,
          space,
          fontSizes,
          sizes,
          borderWidths,
          fontWeights
        };

    return (
        <>
            <Leva theme={theme} />
            <Canvas position={[10,10,10]}>
                <OrbitControls />
                <>
                    
                    <MarchingCubes debug={debug} size={size} shape={shape}  smooth={smooth} surfaceLevel={surfaceLevel} scale={scale}  />
                </>
                <axesHelper />
                <color args={['#080406']} attach="background" />
            </Canvas>
        </>
    )
} 
export default Scene