'use client'

import { useInView, useMotionValue, useSpring, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface CountUpProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

export default function CountUp({ value, suffix = '', prefix = '', duration = 2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inViewRef = useRef(null)
  const isInView = useInView(inViewRef, { once: true })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 })

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, motionValue, value])

  useEffect(() => {
    return spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = prefix + Math.round(v).toLocaleString('es-CL') + suffix
    })
  }, [spring, prefix, suffix])

  return (
    <span ref={inViewRef}>
      <span ref={ref}>{prefix}0{suffix}</span>
    </span>
  )
}
