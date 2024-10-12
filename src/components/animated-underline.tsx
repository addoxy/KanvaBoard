type AnimatedUnderlinedTextProps = {
  children: React.ReactNode;
};

const AnimatedUnderline = ({ children }: AnimatedUnderlinedTextProps) => {
  return (
    <div className="group relative inline-flex flex-col gap-[1px]">
      <div className="flex items-center gap-1 transition-colors group-hover:text-primary">
        {children}
      </div>
      <div className="h-px w-0 bg-primary transition-all group-hover:w-full" />
    </div>
  );
};

export default AnimatedUnderline;
