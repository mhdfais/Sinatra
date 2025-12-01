import globe1 from '../assets/earth1.png'

export default function RotatingGlobe() {
  return (
    <div className="w-full h-[50vh] md:h-[60vh] flex justify-center items-center">
      <img 
        src={globe1} 
        alt="Globe"
        className="w-[500px] h-[500px] animate-spin-slow"
        style={{
          animation: 'rotate 20s linear infinite'
        }}
      />
    </div>
  );
}