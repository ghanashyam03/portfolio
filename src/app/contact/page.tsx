export default function ContactPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 text-center">
      <div className="hud-card p-8 sm:p-12 max-w-xl w-full border-hud">
        <span className="text-xs font-mono text-[#22D3EE] tracking-widest uppercase mb-2 block">
          SYSTEM://COMMUNICATION_UPLINK
        </span>
        <h1 className="text-3xl sm:text-5xl font-space font-bold text-[#F5F7FF] tracking-tight mb-4">
          CONTACT
        </h1>
        <p className="text-sm font-inter text-[#8B93B0]">
          Get in touch for astrophysics PhD research or AI/ML roles.
        </p>
      </div>
    </div>
  );
}
