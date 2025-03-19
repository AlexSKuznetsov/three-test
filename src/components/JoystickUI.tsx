export function JoystickUI() {
  return (
    <div
      id="joystick-zone"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        width: '120px',
        height: '120px',
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '50%',
        border: '2px solid rgba(0, 0, 0, 0.2)',
        touchAction: 'none',
        userSelect: 'none',
      }}
    />
  );
}
