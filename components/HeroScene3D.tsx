'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { useRef, useMemo, Suspense } from 'react'
import * as THREE from 'three'

function CentralBrain() {
  const outerRef = useRef<THREE.Mesh>(null!)
  const wireRef = useRef<THREE.Mesh>(null!)
  const innerRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    outerRef.current.rotation.x = t * 0.12
    outerRef.current.rotation.y = t * 0.17
    outerRef.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.05)
    wireRef.current.rotation.x = -t * 0.07
    wireRef.current.rotation.y = t * 0.22
    innerRef.current.rotation.x = t * 0.25
    innerRef.current.rotation.z = t * 0.18
  })

  return (
    <group>
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#ffffff" emissive="#88aaff" emissiveIntensity={2} roughness={0} metalness={1} />
      </mesh>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial color="#1a3a8f" emissive="#3355cc" emissiveIntensity={0.6} transparent opacity={0.85} roughness={0.1} metalness={0.95} />
      </mesh>
      <mesh ref={wireRef} scale={1.08}>
        <icosahedronGeometry args={[2, 2]} />
        <meshBasicMaterial color="#4f8bff" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.05, 8, 60]} />
        <meshBasicMaterial color="#4f8bff" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0.5, 0]}>
        <torusGeometry args={[3.2, 0.03, 8, 60]} />
        <meshBasicMaterial color="#7c5cfc" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

const NODES = [
  { color: '#4f8bff', speed: 0.22, radius: 5.5, yAmp: 1.5, s: 1.1 },
  { color: '#7c5cfc', speed: 0.17, radius: 7.0, yAmp: 2.0, s: 1.0 },
  { color: '#06b6d4', speed: 0.31, radius: 5.0, yAmp: 1.2, s: 0.9 },
  { color: '#10b981', speed: 0.25, radius: 6.5, yAmp: 1.8, s: 1.2 },
  { color: '#f59e0b', speed: 0.38, radius: 4.8, yAmp: 1.0, s: 0.85 },
  { color: '#ef4444', speed: 0.14, radius: 7.5, yAmp: 2.2, s: 1.3 },
  { color: '#8b5cf6', speed: 0.42, radius: 4.2, yAmp: 0.8, s: 0.95 },
  { color: '#ec4899', speed: 0.28, radius: 6.8, yAmp: 1.6, s: 1.05 },
]

function CategoryNode({ index, color, speed, radius, yAmp, s }: { index: number; color: string; speed: number; radius: number; yAmp: number; s: number }) {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  const init = (index / NODES.length) * Math.PI * 2

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const a = init + t * speed
    groupRef.current.position.x = Math.cos(a) * radius
    groupRef.current.position.z = Math.sin(a) * radius
    groupRef.current.position.y = Math.sin(a * 0.7 + index) * yAmp
    meshRef.current.rotation.x += 0.015
    meshRef.current.rotation.y += 0.02
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} scale={s * 0.5}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} roughness={0.15} metalness={0.9} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={s * 0.5}>
        <torusGeometry args={[0.8, 0.03, 8, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

function NeuralLines() {
  const ref = useRef<THREE.LineSegments>(null!)

  const geometry = useMemo(() => {
    const pts: number[] = []
    NODES.forEach((n, i) => {
      const a = (i / NODES.length) * Math.PI * 2
      pts.push(0, 0, 0, Math.cos(a) * n.radius, 0, Math.sin(a) * n.radius)
    })
    NODES.forEach((n, i) => {
      const n2 = NODES[(i + 1) % NODES.length]
      const a1 = (i / NODES.length) * Math.PI * 2
      const a2 = ((i + 1) / NODES.length) * Math.PI * 2
      pts.push(Math.cos(a1) * n.radius, 0, Math.sin(a1) * n.radius, Math.cos(a2) * n2.radius, 0, Math.sin(a2) * n2.radius)
    })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    return geo
  }, [])

  useFrame(({ clock }) => {
    ;(ref.current.material as THREE.LineBasicMaterial).opacity =
      0.15 + Math.abs(Math.sin(clock.getElapsedTime() * 1.5)) * 0.2
  })

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#4f8bff" transparent opacity={0.25} />
    </lineSegments>
  )
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null!)

  const geometry = useMemo(() => {
    const count = 700
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 55
      arr[i * 3 + 1] = (Math.random() - 0.5) * 28
      arr[i * 3 + 2] = (Math.random() - 0.5) * 28
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3))
    return geo
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.015
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.1
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.04} color="#7c5cfc" transparent opacity={0.75} sizeAttenuation />
    </points>
  )
}

function AuroraRings() {
  const r1 = useRef<THREE.Mesh>(null!)
  const r2 = useRef<THREE.Mesh>(null!)
  const r3 = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    r1.current.rotation.z = t * 0.03
    r2.current.rotation.x = t * 0.02
    r3.current.rotation.y = t * 0.025
  })

  return (
    <>
      <mesh ref={r1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[9, 0.4, 16, 100]} />
        <meshBasicMaterial color="#4f8bff" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 3, 0.5, 0]}>
        <torusGeometry args={[11, 0.25, 16, 100]} />
        <meshBasicMaterial color="#7c5cfc" transparent opacity={0.04} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={r3} rotation={[0.3, Math.PI / 4, 0]}>
        <torusGeometry args={[13, 0.15, 16, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}

function CameraOrbit() {
  const { camera } = useThree()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.07
    camera.position.x = Math.sin(t) * 14
    camera.position.z = Math.cos(t) * 14
    camera.position.y = 3 + Math.sin(t * 0.4) * 2
    camera.lookAt(0, 0, 0)
  })
  return null
}

export function HeroScene3D() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'linear-gradient(160deg, #050814 0%, #080b16 55%, #060410 100%)' }}>
      <Canvas camera={{ position: [0, 3, 14], fov: 60 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <fog attach="fog" args={['#050814', 22, 48]} />
          <ambientLight intensity={0.08} color="#4040ff" />
          <pointLight position={[0, 0, 0]} intensity={4} color="#4f8bff" distance={25} decay={2} />
          <pointLight position={[6, 4, 4]} intensity={1.5} color="#7c5cfc" distance={18} decay={2} />
          <pointLight position={[-5, -3, -5]} intensity={1.2} color="#06b6d4" distance={15} decay={2} />
          <pointLight position={[0, -5, 3]} intensity={0.8} color="#ec4899" distance={12} decay={2} />
          <Stars radius={120} depth={70} count={5000} factor={4} saturation={0.3} fade speed={0.4} />
          <CentralBrain />
          {NODES.map((n, i) => <CategoryNode key={i} index={i} {...n} />)}
          <NeuralLines />
          <FloatingParticles />
          <AuroraRings />
          <CameraOrbit />
        </Suspense>
      </Canvas>
    </div>
  )
}
