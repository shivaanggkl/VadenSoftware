const flowSteps = [
  {
    number: "01",
    title: "See it",
    note: "Five seconds",
    scene: "retake-flow-scene--see",
  },
  {
    number: "02",
    title: "Remember it",
    note: "Phone passes",
    scene: "retake-flow-scene--remember",
  },
  {
    number: "03",
    title: "Retake it",
    note: "From memory",
    scene: "retake-flow-scene--retake",
  },
  {
    number: "04",
    title: "Reveal",
    note: "See the chain",
    scene: "retake-flow-scene--reveal",
  },
] as const;

const roundSteps = [
  ["Start", "Player 1 creates the first photo."],
  ["Pass", "One iPhone moves to the next player."],
  ["Remember", "They get five seconds with the previous photo."],
  ["Recreate", "They make the next photo from memory."],
  ["Reveal", "The complete transformation appears at the end."],
] as const;

export function RetakeTeaser() {
  return (
    <div
      className="retake-teaser"
      role="img"
      aria-label="A restrained Vaden product teaser for RETAKE Party"
    >
      <div aria-hidden="true" className="retake-teaser-inner">
        <div className="retake-teaser-topline">
          <span>Vaden / Product 01</span>
          <span>Coming to iPhone</span>
        </div>
        <div className="retake-teaser-object">
          <div className="retake-teaser-frame">
            <span className="retake-teaser-orb" />
            <span className="retake-teaser-cut" />
          </div>
          <div className="retake-teaser-count">05</div>
          <div className="retake-teaser-track">
            <span className="is-active" />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="retake-teaser-footer">
          <div>
            <span className="retake-teaser-name">RETAKE</span>
            <span className="retake-teaser-type">Photo chain game</span>
          </div>
          <span className="retake-teaser-mark">R</span>
        </div>
      </div>
    </div>
  );
}

export function RetakeFlow() {
  return (
    <div className="retake-flow" aria-label="How a RETAKE Party photo chain unfolds">
      <div className="retake-flow-header" aria-hidden="true">
        <span>One phone</span>
        <span>One evolving photo chain</span>
      </div>
      <ol className="retake-flow-grid">
        {flowSteps.map((step, index) => (
          <li className="retake-flow-step" key={step.number}>
            <div className={`retake-flow-scene ${step.scene}`} aria-hidden="true">
              <span className="retake-flow-subject" />
              {step.title === "Reveal" ? (
                <span className="retake-flow-film">
                  <i />
                  <i />
                  <i />
                </span>
              ) : null}
              {step.title === "Remember it" ? <span className="retake-flow-timer">5</span> : null}
            </div>
            <div className="retake-flow-caption">
              <span className="retake-flow-number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.note}</p>
              </div>
            </div>
            {index < flowSteps.length - 1 ? (
              <span className="retake-flow-arrow" aria-hidden="true">→</span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function RetakeRound() {
  return (
    <div className="retake-round">
      <div className="retake-round-heading">
        <div>
          <p>Round anatomy</p>
          <h2>One photo keeps changing hands.</h2>
        </div>
        <div className="retake-round-facts" aria-label="RETAKE Party round facts">
          <span>3–8 players</span>
          <span>One iPhone</span>
          <span>No account</span>
        </div>
      </div>

      <div className="retake-round-board">
        <div className="retake-round-status" aria-hidden="true">
          <span>Round 01</span>
          <span className="retake-round-live"><i /> In play</span>
        </div>

        <div className="retake-round-core" aria-hidden="true">
          <div className="retake-round-players">
            <span className="is-done">P1</span>
            <span className="is-current">P2</span>
            <span>P3</span>
            <span>P4</span>
            <span>···</span>
          </div>
          <div className="retake-round-clock">
            <span className="retake-round-clock-number">05</span>
            <span className="retake-round-clock-label">seconds to remember</span>
          </div>
          <div className="retake-round-memory">
            <span className="retake-round-memory-shape" />
            <span className="retake-round-memory-label">Previous photo</span>
          </div>
        </div>

        <ol className="retake-round-timeline">
          {roundSteps.map(([title, text], index) => (
            <li key={title}>
              <span className="retake-round-index">0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
