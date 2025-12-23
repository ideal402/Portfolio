'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 1. 개별 파츠 (머리, 몸통, 꼬리) 컴포넌트
// timeOffset: 이 파츠가 머리보다 얼마나 늦게 빛날지 결정 (초 단위)
interface MeteorPartProps {
  geometry: THREE.BufferGeometry;
  color: string;
  position: [number, number, number];
  scale?: [number, number, number];
  timeOffset: number; 
  baseOpacity: number;
}

const MeteorPart = ({ geometry, color, position, scale = [1, 1, 1], timeOffset, baseOpacity }: MeteorPartProps) => {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!materialRef.current) return;

    // 시간 흐름에 따른 밝기 계산 (Sine 파동)
    // timeOffset을 빼주어 파츠마다 빛나는 타이밍을 다르게 함 (위상차)
    const time = state.clock.elapsedTime * 1; // 속도 조절 (숫자가 클수록 깜빡임 빠름)
    const wave = Math.sin(time - timeOffset); 
    
    // wave 값(-1 ~ 1)을 0 ~ 1 사이로 변환하되, 특정 구간에서만 밝게 빛나도록 조정
    // 빛이 흐르는 느낌을 위해 max(0, wave)를 사용해 음수 구간은 끔
    const brightness = Math.max(0, wave); 
    
    // 부드러운 흐름 + 강렬한 반짝임
    const intensity = Math.pow(brightness, 3); // 3제곱하여 피크를 날카롭게 만듦

    materialRef.current.opacity = baseOpacity * intensity;
    materialRef.current.emissiveIntensity = intensity * 2.5; // 발광 강도
  });

  return (
    <mesh geometry={geometry} position={position} scale={scale}>
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        transparent
        opacity={0} // 초기값
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
};


// 2. 3개의 파츠를 묶은 하나의 별똥별 그룹
// 파츠의 설정을 정의하는 인터페이스
interface MeteorConfig {
  count: number;    // 전체 파츠 개수 (머리 포함)
  gap: number;      // 파츠 간 간격
  fadeSpeed: number;// 빛이 뒤로 전달되는 속도 계수
}

const MeteorGroup = ({ count = 8, gap = 0.6, fadeSpeed = 0.5 }: MeteorConfig) => {
  const groupRef = useRef<THREE.Group>(null);

  // 물리적 이동을 위한 속도와 시작 위치 설정 (기존 로직 유지)
  const [speed] = useState(() => Math.random() * 0.4 + 0.2);
  const [startPos] = useState(() => new THREE.Vector3(
    Math.random() * 40 - 20, 
    Math.random() * 20 + 10, 
    Math.random() * 20 - 10
  ));

  // 기하구조 재사용 (메모리 최적화)
  // 머리는 별사탕, 꼬리는 원통형으로 통일하되 크기로 조절
  const headGeo = useMemo(() => new THREE.IcosahedronGeometry(0.4, 0), []);
  const tailGeo = useMemo(() => new THREE.CylinderGeometry(0.1, 0.3, 1, 8), []);

  // 물리적 이동 (Movement)
  useFrame(() => {
    if (!groupRef.current) return;
    // groupRef.current.position.x -= speed;
    // groupRef.current.position.y -= speed * 0.6;

    // 화면 밖 리셋 로직
    if (groupRef.current.position.y < -30) {
      groupRef.current.position.set(
        Math.random() * 40 - 10,
        Math.random() * 10 + 20,
        Math.random() * 20 - 10
      );
    }
  });

  // 파츠 생성 로직 (Array.from 사용)
  const parts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const isHead = i === 0;
      
      // 1. 위치 계산: 인덱스가 커질수록 X축 뒤쪽(+방향)으로 배치
      const xPos = i * gap;
      
      // 2. 스케일 계산: 뒤로 갈수록 점점 작아짐 (0.3배까지 줄어듦)
      const scaleVal = isHead ? 1 : 1.0 - (i / count) * 0.7;
      
      // 3. 시간차(Time Offset) 계산: 뒤에 있는 파츠일수록 나중에 빛남
      const tOffset = i * fadeSpeed;

      // 4. 색상 계산: 머리(골드) -> 꼬리(하늘색 -> 딥블루)
      // 색상 보간을 위해 THREE.Color의 lerp 사용 가능하지만, 여기선 간단히 분기처리
      let color = "#fffwd700"; // 기본 골드
      if (!isHead) {
        // 꼬리 앞쪽은 하늘색, 뒤쪽은 진한 파란색
        color = i < count / 2 ? "#00bfff" : "#4169e1";
      }

      return {
        key: i,
        geometry: isHead ? headGeo : tailGeo,
        position: [xPos, 0, 0] as [number, number, number],
        // 꼬리(Cylinder)는 누워 있어야 하므로 회전 적용, 머리는 그대로
        rotation: isHead ? [0, 0, 0] : [0, 0, -Math.PI / 2],
        scale: [scaleVal, isHead ? scaleVal : 1, scaleVal] as [number, number, number], // Cylinder 길이(Y)는 유지하고 두께만 줄임
        color: color,
        timeOffset: tOffset,
        baseOpacity: isHead ? 1.0 : 0.8 - (i / count) * 0.5, // 뒤로 갈수록 기본 투명도 낮춤
      };
    });
  }, [count, gap, fadeSpeed, headGeo, tailGeo]);

  return (
    <group ref={groupRef} position={startPos} rotation={[0, 0, Math.PI / 3]}>
      {parts.map((part) => (
        <group key={part.key} position={part.position} rotation={part.rotation as any}>
          <MeteorPart
            geometry={part.geometry}
            color={part.color}
            position={[0, 0, 0]} // 그룹으로 위치를 잡았으므로 로컬은 0
            scale={part.scale}
            timeOffset={part.timeOffset}
            baseOpacity={part.baseOpacity}
          />
        </group>
      ))}
    </group>
  );
};
// 3. 메인 씬
export default function MeteorShowerScene() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#020205' }}>
      <Canvas camera={{ position: [0, 0, 40], fov: 45 }}>
        <ambientLight intensity={0.1} />
        <Environment preset="night" />
        
        {/* 배경 별 */}
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        {/* 4개의 별똥별 그룹만 생성 */}
        {Array.from({ length: 4 }).map((_, i) => (
          <MeteorGroup key={i} />
        ))}
      </Canvas>
    </div>
  );
}