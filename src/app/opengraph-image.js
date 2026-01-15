import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Apex Technify - Digital Agency';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0d1f3c 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow effects */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(217, 70, 239, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          {/* Logo Text */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              Apex
            </span>
            <span
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #d946ef, #a855f7, #06b6d4)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Technify
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '28px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '40px',
              letterSpacing: '2px',
            }}
          >
            Let&apos;s Break Boundaries Together
          </div>

          {/* Services */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: '900px',
            }}
          >
            {[
              'Web Development',
              'Logo Design',
              'Digital Marketing',
              'SEO Optimization',
              'Video Editing',
              'E-Commerce',
            ].map((service) => (
              <div
                key={service}
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '30px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '18px',
                }}
              >
                {service}
              </div>
            ))}
          </div>

          {/* Website URL */}
          <div
            style={{
              marginTop: '40px',
              fontSize: '22px',
              color: '#06b6d4',
              letterSpacing: '1px',
            }}
          >
            www.apextechnify.com
          </div>
        </div>

        {/* Bottom gradient line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #d946ef, #a855f7, #06b6d4)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
