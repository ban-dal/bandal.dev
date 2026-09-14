export function LabsGallery() {
  return (
    <main id="main-content" tabIndex={-1} className="py-12 sm:py-20">
      <header className="mb-12 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="text-primary mb-4 font-mono text-xs tracking-[0.2em] uppercase">
            An ongoing collection of experiments
          </p>
          <h1 className="text-6xl font-semibold tracking-tight sm:text-8xl">
            Labs<span className="text-primary">.</span>
          </h1>
          <p className="text-text-secondary mt-6 max-w-lg text-base leading-relaxed">
            움직임을 설계하고, 감각을 코드로 옮깁니다.
            <br />
            직접 만져보며 발견하는 작은 인터랙션 실험실.
          </p>
        </div>
        <p className="text-muted font-mono text-xs">Work in progress</p>
      </header>
      <section
        aria-labelledby="labs-empty-title"
        className="border-border border-t py-16"
      >
        <h2 id="labs-empty-title" className="text-lg font-semibold">
          첫 번째 실험을 준비하고 있습니다.
        </h2>
        <p className="text-muted mt-3 text-sm leading-relaxed">
          애니메이션과 인터랙션을 담은 컴포넌트를 이곳에 전시할 예정입니다.
        </p>
      </section>
      <p className="text-muted border-border mt-8 border-t pt-6 text-sm">
        새로운 움직임을 발견할 때마다, 이곳에 하나씩 기록합니다.
      </p>
    </main>
  );
}
