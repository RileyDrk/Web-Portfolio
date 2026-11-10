import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { heroPhotos } from "../data/heroPhotos"

export default function Hero() {
  const [activePhoto, setActivePhoto] = useState(0)
  const hasMultiplePhotos = heroPhotos.length > 1

  function changePhoto(direction) {
    setActivePhoto((current) => (current + direction + heroPhotos.length) % heroPhotos.length)
  }

  return (
    <section id="hero" className="photo-hero" aria-label="Introduction">
      <div className="photo-hero__intro">
        <div className="animate-fade-up">
          <p className="photo-hero__eyebrow">Game development / Robotics / Computer vision</p>
          <h1>I am <span>Riley Drake</span></h1>
          <p className="photo-hero__description">
            A developer with a curious mind. Building software, exploring new places,
            and figuring things out along the way.
          </p>
        </div>
      </div>

      <div
        className="photo-hero__roller"
        role="region"
        aria-label="Travel photos"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={(event) => {
          if (!hasMultiplePhotos) return
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault()
            changePhoto(event.key === "ArrowLeft" ? -1 : 1)
          }
        }}
      >
        <div className="photo-hero__photos">
          {heroPhotos.map((photo, index) => (
            <div
              key={photo.src}
              aria-hidden={index !== activePhoto}
              className={`photo-hero__slide ${index === activePhoto ? "is-active" : ""}`}
            >
              <img
                src={photo.src}
                alt=""
                aria-hidden="true"
                className="photo-hero__blur"
                style={{ objectPosition: photo.position ?? "center" }}
                decoding="async"
              />
              <img
                src={photo.src}
                alt={photo.alt}
                className="photo-hero__photo"
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          ))}
        </div>

        <div className="photo-hero__footer">
          <span className="photo-hero__caption">Away from the keyboard</span>
          {hasMultiplePhotos && (
            <div className="photo-hero__controls" aria-label="Photo controls">
              <button type="button" onClick={() => changePhoto(-1)} aria-label="Previous photo">
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <span aria-live="polite" aria-atomic="true">{activePhoto + 1} / {heroPhotos.length}</span>
              <button type="button" onClick={() => changePhoto(1)} aria-label="Next photo">
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
