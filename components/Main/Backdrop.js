//Тінь на весь екран background: rgba(0, 0, 0, 0.7);

export default function Backdrop({ setDrawerOpen }) {
  return (
    <div className="Backdrop-container" onClick={(e) => setDrawerOpen(false)}>
      <style jsx>{`
        .Backdrop-container {
          // На весь екран
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          z-index: 1;
        }
      `}</style>
    </div>
  )
}
