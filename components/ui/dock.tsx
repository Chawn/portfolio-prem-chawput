"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string
  magnification?: number
  distance?: number
  direction?: "top" | "middle" | "bottom"
  children: React.ReactNode
}

const dockVariants = cva(
  "mx-auto w-max h-[58px] p-2 flex gap-2 rounded-2xl border supports-backdrop-blur:bg-white/10 bg-white/10 backdrop-blur-md border-white/20",
)

const DockContext = React.createContext<{
  mouseX: MotionValue<number> | null
  magnification: number
  distance: number
}>({
  mouseX: null,
  magnification: 60,
  distance: 140,
})

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = 60,
      distance = 140,
      direction = "bottom",
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity)

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(dockVariants({ className }), className)}
        {...props}
      >
        <DockContext.Provider value={{ mouseX, magnification, distance }}>
          {children}
        </DockContext.Provider>
      </motion.div>
    )
  },
)

Dock.displayName = "Dock"

export interface DockIconProps {
  size?: number
  magnification?: number
  distance?: number
  mouseX?: MotionValue<number>
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

const DockIcon = ({
  size = 40,
  magnification: propsMagnification,
  distance: propsDistance,
  mouseX: propsMouseX,
  className,
  children,
  onClick,
  ...props
}: DockIconProps) => {
  const ref = React.useRef<HTMLDivElement>(null)

  const context = React.useContext(DockContext)

  // Use props if provided, otherwise context
  const mouseX = propsMouseX || context.mouseX || useMotionValue(Infinity)
  const magnification = propsMagnification || context.magnification
  const distance = propsDistance || context.distance

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size],
  )

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full bg-neutral-400/20 hover:bg-neutral-400/30 dark:bg-neutral-800/40 dark:hover:bg-neutral-800/60 transition-colors",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <motion.div style={{ width: width, height: width }} className="flex items-center justify-center">
        {React.Children.map(children, (child) => {
          // Check if it's a valid React element to clone
          if (React.isValidElement(child)) {
            const element = child as React.ReactElement<any>
            // Pass specific props to the child icon if needed, but styling is usually enough
            // lucide-react icons accept 'size' prop.
            // We can calculate dynamic size if we want, but keeping it standard is safer for layout.
            // Let's just clone it to ensure it receives standard props if any
            return React.cloneElement(element, {
              className: cn("w-1/2 h-1/2", element.props.className)
            })
          }
          return child
        })}
      </motion.div>
    </motion.div>
  )
}

DockIcon.displayName = "DockIcon"

export { Dock, DockIcon, dockVariants }
