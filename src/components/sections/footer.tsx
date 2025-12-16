import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 py-32">
      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center gap-8 px-4">
        <h2 className="text-center font-headline text-4xl font-semibold">
          Ready to Build Conviction?
        </h2>
        <Button
          size="lg"
          className="rounded-full bg-white px-8 text-lg font-semibold text-black transition-transform duration-300 hover:scale-105"
        >
          Get in Touch
        </Button>
      </div>
      <h1
        className="absolute inset-0 -bottom-1/4 z-0 text-center font-black leading-none text-white/5"
        style={{ fontSize: 'clamp(10rem, 30vw, 24rem)' }}
        aria-hidden="true"
      >
        VAOMI.AI
      </h1>
    </footer>
  );
}
