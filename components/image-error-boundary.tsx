"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import FallbackSVG from "./fallback-svg"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  width?: number
  height?: number
}

interface State {
  hasError: boolean
}

export default class ImageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Image Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return <FallbackSVG width={this.props.width || 300} height={this.props.height || 200} text="Image Error" />
    }

    return this.props.children
  }
}
