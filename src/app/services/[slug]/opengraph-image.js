import { ImageResponse } from 'next/og';
import { getServiceBySlug } from '@/data/services';

export const runtime = 'edge';

export const alt = 'Apex Technify Service';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  const serviceName = service?.title || 'Our Services';
  const serviceTagline = service?.tagline || 'Professional Digital Services';
  const serviceColor = service?.color || '#d946ef';

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
            top: '-150px',
            right: '100px',
            width: '500px',
            height: '500px',
            background: `radial-gradient(circle, ${serviceColor}40 0%, transparent 70%)`,
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-50px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
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
            padding: '40px',
          }}
        >
          {/* Company Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            <span
              style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              Apex
            </span>
            <span
              style={{
                fontSize: '36px',
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #d946ef, #a855f7, #06b6d4)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Technify
            </span>
          </div>

          {/* Service Name */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '16px',
              textAlign: 'center',
              display: 'flex',
            }}
          >
            {serviceName}
            <span style={{ color: serviceColor }}>.</span>
          </div>

          {/* Service Tagline */}
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '40px',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            {serviceTagline}
          </div>

          {/* CTA Badge */}
          <div
            style={{
              display: 'flex',
              padding: '16px 40px',
              background: `linear-gradient(135deg, ${serviceColor}, #06b6d4)`,
              borderRadius: '50px',
              color: 'white',
              fontSize: '22px',
              fontWeight: '600',
            }}
          >
            Get Started Today
          </div>

          {/* Website URL */}
          <div
            style={{
              marginTop: '30px',
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.5)',
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
            background: `linear-gradient(90deg, ${serviceColor}, #06b6d4)`,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
