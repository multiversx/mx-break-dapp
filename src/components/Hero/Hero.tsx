export const Hero = () => {
  return (
    <div className="absolute flex w-full flex-col items-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="z-0 top-[-10rem] w-auto min-w-full min-h-full max-w-none"
      >
        <source src="https://cdn.multiversx.com/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
