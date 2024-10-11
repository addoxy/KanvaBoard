type AnimatedUnderlinedTextProps = {
  children: React.ReactNode;
};

const AnimatedUnderlinedText = ({ children }: AnimatedUnderlinedTextProps) => {
  return (
    <div className="group relative inline-flex flex-col gap-[1px]">
      <div className="group-hover:text-primary flex items-center gap-1 transition-colors">
        {children}
      </div>
      <div className="bg-primary h-px w-0 transition-all group-hover:w-full" />
    </div>
  );
};

export default AnimatedUnderlinedText;
