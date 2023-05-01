import React, { useCallback, useMemo } from 'react'

import { Html, useEdgeSplit } from '@react-three/drei'
import { BoxGeometry, EdgesGeometry } from 'three'
import { cubeVertices, vertices } from './triangulation'

import className from 'classnames'

import { useStore } from './scene'
import { useControls } from 'leva'

function VertexLabel({ id, cubeIndex, position, onClick }) {
  const isSelected = useMemo(() => {
    return (cubeIndex & (1 << id)) !== 0
  }, [cubeIndex])

  return (
    <mesh position={position}>
      <Html className={className('label', isSelected && 'active')}>
        <div onPointerDown={onClick}>{id}</div>
      </Html>
    </mesh>
  )
}

export function Debug({ onCubeIndexChange, cubeIndex, onChangeGrid,grid }) {
  const edges = useMemo(() => {
    const box = new BoxGeometry()
    const edge = new EdgesGeometry(box)

    return edge
  }, [])
  
  const onClick = useCallback(
    (i) => () => {
      // bitwise operator to set the toggle the bit at i
      
      cubeIndex ^= 1 << i
      grid[i] = grid[i]==0 ? 1 : 0
      onCubeIndexChange(cubeIndex)
      onChangeGrid(grid)
      console.log(grid)
    },
    [onCubeIndexChange, onChangeGrid]
  )

  const { labels } = useControls({
    labels: true
  })

  return (
    <>
      <line>
        <lineSegments args={[edges]} />
        <lineBasicMaterial />
      </line>

      {labels &&
        cubeVertices.map((v, i) => (
          <VertexLabel
            key={i}
            id={i}
            cubeIndex={cubeIndex}
            onClick={onClick(i)}
            position={v}></VertexLabel>
        ))}
    </>
  )
}