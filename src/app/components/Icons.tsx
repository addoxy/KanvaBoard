import { cn } from "../utils/utils";

export const CrossIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-current", className)}
      viewBox="0 0 24 24"
    >
      <path d="M16.066 8.995a.75.75 0 1 0-1.06-1.061L12 10.939L8.995 7.934a.75.75 0 1 0-1.06 1.06L10.938 12l-3.005 3.005a.75.75 0 0 0 1.06 1.06L12 13.06l3.005 3.006a.75.75 0 0 0 1.06-1.06L13.062 12z" />
    </svg>
  );
};

export const DragIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="1.33333" cy="1.33333" r="1.33333" />
      <circle cx="6.66683" cy="1.33333" r="1.33333" />
      <circle cx="6.66683" cy="6.66671" r="1.33333" />
      <circle cx="1.33333" cy="6.66671" r="1.33333" />
    </svg>
  );
};

export const HashIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
    >
      <path d="M224 88h-48.6l8.47-46.57a8 8 0 0 0-15.74-2.86l-9 49.43H111.4l8.47-46.57a8 8 0 0 0-15.74-2.86L95.14 88H48a8 8 0 0 0 0 16h44.23l-8.73 48H32a8 8 0 0 0 0 16h48.6l-8.47 46.57a8 8 0 0 0 6.44 9.3A7.79 7.79 0 0 0 80 224a8 8 0 0 0 7.86-6.57l9-49.43h47.74l-8.47 46.57a8 8 0 0 0 6.44 9.3a7.79 7.79 0 0 0 1.43.13a8 8 0 0 0 7.86-6.57l9-49.43H208a8 8 0 0 0 0-16h-44.23l8.73-48H224a8 8 0 0 0 0-16m-76.5 64H99.77l8.73-48h47.73Z" />
    </svg>
  );
};

export const PreferenceIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g fill="none" fillRule="evenodd">
        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
        <path
          fill="currentColor"
          d="M14.035 2.809c.37-.266.89-.39 1.401-.203a9.99 9.99 0 0 1 2.982 1.725c.417.35.57.861.524 1.313c-.075.753.057 1.48.42 2.106c.32.557.802.997 1.39 1.307l.225.11c.414.187.782.576.875 1.113a10.06 10.06 0 0 1 0 3.44c-.083.484-.39.847-.753 1.051l-.122.063c-.69.31-1.254.79-1.616 1.416c-.362.627-.494 1.353-.419 2.106c.045.452-.107.964-.524 1.313a9.99 9.99 0 0 1-2.982 1.725a1.51 1.51 0 0 1-1.4-.203C13.42 20.75 12.723 20.5 12 20.5s-1.42.249-2.035.691a1.51 1.51 0 0 1-1.401.203a9.989 9.989 0 0 1-2.982-1.725a1.511 1.511 0 0 1-.524-1.313c.075-.753-.058-1.48-.42-2.106a3.414 3.414 0 0 0-1.39-1.307l-.225-.11a1.511 1.511 0 0 1-.875-1.113a10.057 10.057 0 0 1 0-3.44c.083-.484.39-.847.753-1.051l.122-.062c.69-.311 1.254-.79 1.616-1.417c.361-.626.494-1.353.419-2.106a1.511 1.511 0 0 1 .524-1.313a9.99 9.99 0 0 1 2.982-1.725a1.511 1.511 0 0 1 1.4.203c.615.442 1.312.691 2.036.691s1.42-.249 2.035-.691m.957 1.769c-.866.57-1.887.922-2.992.922s-2.126-.353-2.992-.922A7.99 7.99 0 0 0 7.068 5.7c.06 1.033-.145 2.093-.697 3.05c-.553.956-1.368 1.663-2.293 2.128a8.078 8.078 0 0 0 0 2.242c.925.465 1.74 1.172 2.293 2.13c.552.955.757 2.015.697 3.048a7.99 7.99 0 0 0 1.94 1.123c.866-.57 1.887-.922 2.992-.922s2.126.353 2.992.922a7.993 7.993 0 0 0 1.94-1.122c-.06-1.034.145-2.094.697-3.05c.552-.957 1.368-1.664 2.293-2.13a8.066 8.066 0 0 0 0-2.24c-.925-.466-1.74-1.173-2.293-2.13c-.552-.956-.757-2.016-.697-3.05a7.99 7.99 0 0 0-1.94-1.122M12 8a4 4 0 1 1 0 8a4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4"
        />
      </g>
    </svg>
  );
};

export const ProjectIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M7.25 6a.75.75 0 0 0-.75.75v7.5a.75.75 0 0 0 1.5 0v-7.5A.75.75 0 0 0 7.25 6M12 6a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0v-4.5A.75.75 0 0 0 12 6m4 .75a.75.75 0 0 1 1.5 0v9.5a.75.75 0 0 1-1.5 0z" />
      <path d="M3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0 1 20.25 22H3.75A1.75 1.75 0 0 1 2 20.25V3.75C2 2.784 2.784 2 3.75 2M3.5 3.75v16.5c0 .138.112.25.25.25h16.5a.25.25 0 0 0 .25-.25V3.75a.25.25 0 0 0-.25-.25H3.75a.25.25 0 0 0-.25.25" />
    </svg>
  );
};

export const SignoutIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
    >
      <path
        fill="currentColor"
        d="M112 216a8 8 0 0 1-8 8H48a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h56a8 8 0 0 1 0 16H48v160h56a8 8 0 0 1 8 8m109.66-93.66l-40-40a8 8 0 0 0-11.32 11.32L196.69 120H104a8 8 0 0 0 0 16h92.69l-26.35 26.34a8 8 0 0 0 11.32 11.32l40-40a8 8 0 0 0 0-11.32"
      />
    </svg>
  );
};

export const TemplateIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <path d="M26 6v4H6V6zm0-2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M10 16v10H6V16zm0-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V16a2 2 0 0 0-2-2m16 2v10H16V16zm0-2H16a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V16a2 2 0 0 0-2-2" />
    </svg>
  );
};
