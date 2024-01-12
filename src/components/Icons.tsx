import { cn } from "../utils/utils";

export const CrossIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
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
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="1.33333" cy="1.33333" r="1.33333" fill="#D4D4D8" />
      <circle cx="6.66683" cy="1.33333" r="1.33333" fill="#D4D4D8" />
      <circle cx="6.66683" cy="6.66671" r="1.33333" fill="#D4D4D8" />
      <circle cx="1.33333" cy="6.66671" r="1.33333" fill="#D4D4D8" />
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
        d="M116 216a12 12 0 0 1-12 12H48a20 20 0 0 1-20-20V48a20 20 0 0 1 20-20h56a12 12 0 0 1 0 24H52v152h52a12 12 0 0 1 12 12m108.49-96.49l-40-40a12 12 0 0 0-17 17L187 116h-83a12 12 0 0 0 0 24h83l-19.52 19.51a12 12 0 0 0 17 17l40-40a12 12 0 0 0 .01-17"
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

export const GoogleIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301c1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08z"
      />
    </svg>
  );
};

export const GithubIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27c.68 0 1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8"
      />
    </svg>
  );
};

export const DiscordIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011a.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0a8.258 8.258 0 0 0-.412-.833a.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02a.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059a.051.051 0 0 0-.018-.011a8.875 8.875 0 0 1-1.248-.595a.05.05 0 0 1-.02-.066a.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085a8.254 8.254 0 0 1-1.249.594a.05.05 0 0 0-.03.03a.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019a13.235 13.235 0 0 0 4.001-2.02a.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612c0-.889.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613c0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612c0-.889.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613c0 .888-.631 1.612-1.438 1.612"
      />
    </svg>
  );
};

export const SearchIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M338.29 338.29L448 448"
      />
    </svg>
  );
};

export const ThreeDotsIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
    >
      <path
        fill="currentColor"
        d="M144 128a16 16 0 1 1-16-16a16 16 0 0 1 16 16m-84-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16m136 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16"
      />
    </svg>
  );
};

export const SidebarIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m7-7a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z"
      />
    </svg>
  );
};

export const ArrowIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      preserveAspectRatio="none"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m17 14l-5-5l-5 5"
      />
    </svg>
  );
};

export const TemplateFeatureIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        d="M2 4.5A2.5 2.5 0 0 1 4.5 2h7A2.5 2.5 0 0 1 14 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 11.5zM4.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h1V3zm5 10V3h-3v10zm1 0h1a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-1z"
      />
    </svg>
  );
};

export const DragFeatureIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 10a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2zM4 4v.01M8 4v.01M12 4v.01M16 4v.01M4 8v.01M4 12v.01M4 16v.01"
      />
    </svg>
  );
};

export const CustomizeFeatureIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M16.687 18.365q-.55-.125-.928-.33q-.378-.204-.73-.597l-.517.21q-.137.05-.268.016t-.211-.164l-.139-.23q-.1-.132-.079-.287q.022-.156.147-.262l.42-.34q-.184-.512-.184-1.016q0-.503.185-1.034l-.421-.36q-.125-.106-.156-.252q-.031-.146.069-.277l.158-.25q.08-.13.211-.164t.268.016l.517.21q.333-.373.74-.588q.406-.214.918-.34l.07-.503q.031-.156.134-.259q.103-.102.265-.102h.277q.161 0 .264.102q.103.103.134.26l.07.503q.512.106.91.33q.397.224.749.597l.517-.21q.136-.05.267-.016t.212.164l.157.25q.1.131.07.277q-.031.146-.156.252l-.421.36q.204.55.194 1.044q-.01.494-.213 1.006l.42.34q.087.067.147.223t-.06.325l-.138.231q-.081.13-.212.164q-.13.034-.267-.016l-.517-.21q-.352.374-.73.588q-.378.214-.928.34l-.071.503q-.031.156-.134.259q-.103.103-.264.103h-.277q-.162 0-.265-.103q-.103-.103-.133-.259zm.607-.865q.883 0 1.519-.636q.635-.635.635-1.518t-.636-1.518q-.635-.636-1.518-.636q-.882 0-1.518.636q-.636.635-.636 1.518t.636 1.518q.636.636 1.518.636M5.615 19q-.69 0-1.152-.462Q4 18.075 4 17.385V4.615q0-.69.463-1.152Q4.925 3 5.615 3h12.77q.69 0 1.152.463q.463.462.463 1.152v5.612q-.244-.148-.485-.247q-.24-.1-.515-.174v-5.19q0-.27-.173-.443T18.385 4H5.615q-.269 0-.442.173T5 4.615v9h3.57q.376 0 .563.119q.186.118.311.362q.293.556.746.91q.454.354 1.012.504q.083.984.457 1.877q.374.892 1.058 1.613z"
      />
    </svg>
  );
};

export const FavoriteIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M22.45 6a5.47 5.47 0 0 1 3.91 1.64a5.7 5.7 0 0 1 0 8L16 26.13L5.64 15.64a5.7 5.7 0 0 1 0-8a5.48 5.48 0 0 1 7.82 0l2.54 2.6l2.53-2.58A5.44 5.44 0 0 1 22.45 6m0-2a7.47 7.47 0 0 0-5.34 2.24L16 7.36l-1.11-1.12a7.49 7.49 0 0 0-10.68 0a7.72 7.72 0 0 0 0 10.82L16 29l11.79-11.94a7.72 7.72 0 0 0 0-10.82A7.49 7.49 0 0 0 22.45 4"
      />
    </svg>
  );
};

export const Logo = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current group", className)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="7.5"
        height="20"
        rx="1.5"
        className="fill-violet-800 group-hover:fill-purple-800"
      />
      <rect
        x="12.5"
        y="10"
        width="7.5"
        height="10"
        rx="1.5"
        className="fill-violet-800 group-hover:fill-purple-800"
      />
      <rect
        x="12.5"
        width="7.5"
        height="6.25"
        rx="1.5"
        className="fill-violet-800 group-hover:fill-purple-800"
      />
    </svg>
  );
};

export const NotFoundIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={cn("fill-current group", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
    >
      <path
        fill="currentColor"
        d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2m9 12.28a1.8 1.8 0 1 1-1.8-1.8a1.8 1.8 0 0 1 1.8 1.8m-15.55 1.8a1.8 1.8 0 1 1 1.8-1.8a1.8 1.8 0 0 1-1.84 1.8Zm14 7.53a1 1 0 0 1-1.6 1.2a7 7 0 0 0-11.31.13a1 1 0 1 1-1.63-1.16a9 9 0 0 1 14.54-.17"
        className="clr-i-solid clr-i-solid-path-1"
      />
      <path fill="none" d="M0 0h36v36H0z" />
    </svg>
  );
};
