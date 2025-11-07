"use client"

import type React from "react"

import { Camera, Grid3x3, Clock, SettingsIcon, Sparkles } from "lucide-react"
import { useState, useRef } from "react"

export default function Home() {
  const [location, setLocation] = useState("/")
  const [imageCount, setImageCount] = useState(1)

  return (
    <div
      className="min-h-screen relative flex flex-col"
      style={{ background: "linear-gradient(135deg, #0A133B 0%, #002857 25%, #004b93 50%, #002857 75%, #0A133B 100%)" }}
    >
      {/* Background shimmer effect */}
      <div className="phone-shimmer-bg fixed inset-0 pointer-events-none" />

      {/* Main Content */}
      <div className="screen-content relative z-10 flex-1 flex flex-col">
        <div className="scrollable-content flex-1 overflow-y-auto pb-[100px] pt-[max(32px,env(safe-area-inset-top))]">
          {location === "/" && (
            <GenerateScreen setLocation={setLocation} imageCount={imageCount} setImageCount={setImageCount} />
          )}
          {location === "/results" && <ResultsPage imageCount={imageCount} />}
          {location === "/history" && <HistoryPage />}
          {location === "/settings" && <SettingsPage />}
        </div>
      </div>

      {/* Bottom Navigation - Always Visible */}
      <div
        className="glass-3d-surface-enhanced fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-4 pt-3"
        style={{
          height: "80px",
          borderRadius: "40px 40px 0 0",
          paddingBottom: "max(12px, env(safe-area-inset-bottom))",
        }}
      >
        <button
          onClick={() => setLocation("/")}
          className={`nav-button glass-3d-button ${location === "/" ? "active" : ""}`}
          aria-label="Home"
        >
          <Camera className="w-5 h-5" />
        </button>
        <button
          onClick={() => setLocation("/results")}
          className={`nav-button glass-3d-button ${location === "/results" ? "active" : ""}`}
          aria-label="Results"
        >
          <Grid3x3 className="w-5 h-5" />
        </button>
        <button
          onClick={() => setLocation("/history")}
          className={`nav-button glass-3d-button ${location === "/history" ? "active" : ""}`}
          aria-label="History"
        >
          <Clock className="w-5 h-5" />
        </button>
        <button
          onClick={() => setLocation("/settings")}
          className={`nav-button glass-3d-button ${location === "/settings" ? "active" : ""}`}
          aria-label="Settings"
        >
          <SettingsIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

function GenerateScreen({
  setLocation,
  imageCount,
  setImageCount,
}: { setLocation: (loc: string) => void; imageCount: number; setImageCount: (count: number) => void }) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!imageFile) return
    setIsGenerating(true)
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false)
      setLocation("/results")
    }, 2000)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="px-6">
      {/* Greeting Card */}
      <div className="glass-3d-surface rounded-3xl p-6 mb-6">
        <h1 className="text-xl font-bold text-white/90">{getGreeting()}, Creator</h1>
      </div>

      {/* Image Count Selector */}
      <div className="flex justify-center gap-4 mb-6">
        {[1, 2, 4, 6, 8].map((num) => (
          <button
            key={num}
            onClick={() => setImageCount(num)}
            className={`w-12 h-12 rounded-full glass-3d-button flex items-center justify-center ${
              imageCount === num ? "active" : ""
            }`}
            aria-label={`Generate ${num} image${num > 1 ? "s" : ""}`}
          >
            <span className="button-text">{num}</span>
          </button>
        ))}
      </div>

      {/* Upload Area */}
      <div className="glass-3d-surface rounded-3xl p-8 mb-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
          aria-label="Upload photo"
        />
        <div onClick={() => fileInputRef.current?.click()} className="w-full h-full relative group cursor-pointer">
          {imagePreview ? (
            <>
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center gap-2">
                <Camera className="w-12 h-12 text-white" />
                <span className="text-white font-medium">Change Image</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative mb-6">
                <img src="/fashion-muse-logo.png" alt="Fashion Muse Studio" className="w-64 h-auto mx-auto" />
              </div>
              <p className="text-white/90 font-medium mb-2">Tap to upload your photo</p>
              <p className="text-white/50 text-sm">Start your fashion transformation</p>
            </div>
          )}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!imageFile || isGenerating}
        className="glass-3d-button primary-button w-full mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Generate photoshoot"
      >
        {isGenerating ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="button-text text-white">Generating...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="button-text text-white">Generate Photoshoot</span>
          </div>
        )}
      </button>

      {/* Advanced Options */}
      <div className="glass-3d-surface rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="collapsible-header w-full text-left"
          aria-expanded={showAdvanced}
        >
          <span className="text-white/80 font-medium">Advanced Options</span>
          <span className="text-white/60 text-2xl">{showAdvanced ? "−" : "+"}</span>
        </button>
        {showAdvanced && (
          <div className="px-6 pb-6 pt-2 space-y-4">
            <div className="text-xs text-white/50">
              <p>⚠️ Add your Gemini API key in Settings to run without signing in</p>
            </div>
            <div className="text-xs text-white/60">
              <p>Cost: 1 credit • More options available in Settings</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ResultsPage({ imageCount }: { imageCount: number }) {
  return (
    <div className="px-6">
      <h1 className="text-2xl font-bold text-white mb-6">Generated Photos</h1>

      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: imageCount }).map((_, index) => (
          <div key={index} className="glass-3d-surface rounded-2xl overflow-hidden aspect-[3/4]">
            <div className="w-full h-full bg-white/5 flex flex-col items-center justify-center p-4">
              <img
                src="/fashion-muse-logo.png"
                alt="Fashion Muse Studio"
                className="w-32 h-auto mx-auto mb-3 opacity-60"
              />
              <p className="text-white/60 text-sm">Image {index + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function HistoryPage() {
  return (
    <div className="px-6">
      <div className="glass-3d-surface rounded-3xl p-8 text-center">
        <Clock className="w-16 h-16 text-white/40 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">No generation history yet</h2>
        <p className="text-white/60 text-sm">Your generated photos will appear here</p>
      </div>
    </div>
  )
}

function SettingsPage() {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [style, setStyle] = useState("Editorial")
  const [cameraAngle, setCameraAngle] = useState("Hero low angle")
  const [lighting, setLighting] = useState("Rembrandt")

  return (
    <div className="px-6 space-y-6">
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

      {/* Gemini API Key */}
      <div className="glass-3d-surface rounded-2xl p-6">
        <h3 className="text-white font-medium mb-4">Gemini API Key</h3>
        <input
          type="password"
          placeholder="Enter your Gemini API key"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
          aria-label="Gemini API Key"
        />
        <p className="text-white/50 text-xs mt-2">Add your API key to generate images without signing in</p>
      </div>

      {/* Advanced Options */}
      <div className="glass-3d-surface rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
          className="collapsible-header w-full"
          aria-expanded={showAdvancedOptions}
        >
          <span className="text-white/80 font-medium">Advanced Options</span>
          <span className="text-white/60 text-2xl">{showAdvancedOptions ? "−" : "+"}</span>
        </button>

        {showAdvancedOptions && (
          <div className="px-6 pb-6 space-y-6">
            {/* Style Selection */}
            <div>
              <label className="block text-white/70 text-sm mb-3">Style</label>
              <div className="flex flex-wrap gap-2">
                {["Editorial", "Vogue", "Minimalist", "Vintage"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`glass-3d-button px-4 py-2 rounded-xl ${style === s ? "active" : ""}`}
                    aria-pressed={style === s}
                  >
                    <span className="button-text text-sm">{s}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Camera Angle */}
            <div>
              <label className="block text-white/70 text-sm mb-3">Camera Angle</label>
              <div className="flex flex-wrap gap-2">
                {["Hero low angle", "Beauty close-up", "Editorial side", "Full body"].map((angle) => (
                  <button
                    key={angle}
                    onClick={() => setCameraAngle(angle)}
                    className={`glass-3d-button px-4 py-2 rounded-xl ${cameraAngle === angle ? "active" : ""}`}
                    aria-pressed={cameraAngle === angle}
                  >
                    <span className="button-text text-sm">{angle}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting */}
            <div>
              <label className="block text-white/70 text-sm mb-3">Lighting</label>
              <div className="flex flex-wrap gap-2">
                {["Rembrandt", "Butterfly", "Split", "Loop"].map((light) => (
                  <button
                    key={light}
                    onClick={() => setLighting(light)}
                    className={`glass-3d-button px-4 py-2 rounded-xl ${lighting === light ? "active" : ""}`}
                    aria-pressed={lighting === light}
                  >
                    <span className="button-text text-sm">{light}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* App Info */}
      <div className="text-center text-white/40 text-sm pt-8">
        <p>Fashion Muse Studio v1.5.0</p>
        <p className="mt-1">© 2025 All rights reserved</p>
      </div>
    </div>
  )
}
