import type { SVGProps, ComponentType } from 'react';

export type IconName = keyof typeof icons;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
}

const icons = {
  'sidebar-toggle': (props: SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 18L4 18M14.5 12L4 12M20 6L4 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  arrow: (props: SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 10L12.0007 14L16 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  'active-section': (props: SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.42441 16.1998H3.82441C2.83029 16.1998 2.02441 15.3939 2.02441 14.3998L2.02448 3.59979C2.02449 2.60569 2.83038 1.7998 3.82448 1.7998H11.9247C12.9188 1.7998 13.7247 2.60569 13.7247 3.5998V8.5498M10.1247 13.6498L11.7747 15.2998L15.9747 10.7998"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  'archive-section': (props: SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.6845 7.86304V5.6648C14.6845 5.20456 14.3114 4.83146 13.8512 4.83146H8.96652C8.74551 4.83146 8.53355 4.74367 8.37727 4.58739L7.34963 3.55975C7.19335 3.40347 6.98139 3.31567 6.76038 3.31567H2.63363C2.17339 3.31567 1.80029 3.68877 1.80029 4.14901V13.8508C1.80029 14.311 2.17339 14.6841 2.63363 14.6841H3.43242C3.78674 14.6841 4.07398 14.3969 4.07398 14.0425C4.07398 13.9656 4.08781 13.8893 4.11483 13.8173L6.14489 8.40377C6.26686 8.07852 6.57779 7.86304 6.92516 7.86304H15.0441C15.6129 7.86304 16.0145 8.42029 15.8347 8.9599L14.1165 14.1143C14.0031 14.4546 13.6847 14.6841 13.326 14.6841H3.31608"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  'users-section': (props: SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.80029 13.6626C2.62428 12.2882 4.43018 11.3476 7.24763 11.3476C10.0651 11.3476 11.871 12.2882 12.695 13.6626M13.2162 10.3054C14.7083 11.0514 15.4543 11.7975 16.2003 13.2895M11.6645 4.6032C12.3665 4.98086 12.8438 5.72244 12.8438 6.57548C12.8438 7.40387 12.3937 8.12715 11.7247 8.51412M9.48568 6.57545C9.48568 7.81149 8.48367 8.8135 7.24763 8.8135C6.01159 8.8135 5.00958 7.81149 5.00958 6.57545C5.00958 5.33941 6.01159 4.3374 7.24763 4.3374C8.48367 4.3374 9.48568 5.33941 9.48568 6.57545Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  'translate-section': (props: SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 15.96L3.00027 13.5297C3.00042 12.1878 4.08833 11.1 5.43027 11.1H6.75M11.1 5.43C11.1 6.77205 10.0121 7.86 8.67 7.86C7.32795 7.86 6.24 6.77205 6.24 5.43C6.24 4.08795 7.32795 3 8.67 3C10.0121 3 11.1 4.08795 11.1 5.43Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.1094 11.1346V10.8101V10.4856V9.83654C11.1094 9.58164 11.2983 9.375 11.5312 9.375H13.0078C13.2408 9.375 13.4297 9.58164 13.4297 9.83654V10.4856V10.8101V11.1346M9.84375 15.75H14.9062C15.3722 15.75 15.75 15.3367 15.75 14.8269V12.0577C15.75 11.5479 15.3722 11.1346 14.9062 11.1346H9.84375C9.37776 11.1346 9 11.5479 9 12.0577V14.8269C9 15.3367 9.37776 15.75 9.84375 15.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  'car-section': (props: SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.85719 12.7715H3.17148C2.41406 12.7715 1.80005 12.1575 1.80005 11.4V5.22861C1.80005 4.47119 2.41406 3.85718 3.17148 3.85718H9.3429C10.1003 3.85718 10.7143 4.47119 10.7143 5.22861V11.4C10.7143 12.1575 10.1003 12.7715 9.3429 12.7715H8.65719M11.7429 12.7715H11.4C11.0213 12.7715 10.7143 12.4645 10.7143 12.0857V6.25718C10.7143 5.87847 11.0213 5.57146 11.4 5.57146H13.1276C13.3359 5.57146 13.5329 5.66615 13.6631 5.82882L16.0498 8.81221C16.1471 8.93379 16.2 9.08486 16.2 9.24057V12.0857C16.2 12.4645 15.893 12.7715 15.5143 12.7715M7.97148 12.4286C7.97148 13.3754 7.20396 14.1429 6.25719 14.1429C5.31042 14.1429 4.54291 13.3754 4.54291 12.4286C4.54291 11.4818 5.31042 10.7143 6.25719 10.7143C7.20396 10.7143 7.97148 11.4818 7.97148 12.4286ZM15.1715 12.4286C15.1715 13.3754 14.404 14.1429 13.4572 14.1429C12.5104 14.1429 11.7429 13.3754 11.7429 12.4286C11.7429 11.4818 12.5104 10.7143 13.4572 10.7143C14.404 10.7143 15.1715 11.4818 15.1715 12.4286Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  'directory-section': (props: SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.79458 15.1715V4.0629M8.79458 15.1715L7.70147 14.0784C7.08421 13.4611 6.2474 13.1143 5.37445 13.1143H2.62243C2.16798 13.1143 1.80029 12.7459 1.80029 12.2915V3.65147C1.80029 3.19702 2.1687 2.82861 2.62315 2.82861H5.78551C6.65845 2.82861 7.49564 3.17539 8.1129 3.79265L8.79458 4.47433L9.47625 3.79265C10.0935 3.17539 10.9307 2.82861 11.8036 2.82861H15.3774C15.8319 2.82861 16.2003 3.19702 16.2003 3.65147V12.2915C16.2003 12.7459 15.8319 13.1143 15.3774 13.1143H12.2151C11.3421 13.1143 10.5049 13.4611 9.88768 14.0784L8.79458 15.1715Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  'manage-section': (props: SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.15029 14.8502C3.40856 14.561 5.14368 13.1983 6.00611 12.5265C6.32021 12.2818 6.7055 12.1502 7.10365 12.1502C8.06639 12.1502 9.9216 12.1502 10.889 12.1502C11.2918 12.1502 11.6809 12.2874 12.0052 12.5263C13.1188 13.3467 14.1627 13.958 15.3003 14.8502M4.50029 16.2H13.5003C14.9915 16.2 16.2003 14.9912 16.2003 13.5V4.50005C16.2003 3.00888 14.9915 1.80005 13.5003 1.80005H4.50029C3.00912 1.80005 1.80029 3.00888 1.80029 4.50005V13.5C1.80029 14.9912 3.00912 16.2 4.50029 16.2ZM11.5792 6.95408C11.5792 5.58045 10.4196 4.45811 9.00029 4.45811C7.58101 4.45811 6.42138 5.58045 6.42138 6.95408C6.42138 8.32771 7.58101 9.45005 9.00029 9.45005C10.4196 9.45005 11.5792 8.32771 11.5792 6.95408Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),
  close: (props: SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 6L6 12M12 12L6 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  ),
  info: (props: SVGProps<SVGSVGElement>) => (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  ),
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 57 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M56.6015 0L55.5449 6.69014H20.8076L24.5346 0H56.6015Z"
        fill="currentColor"
      />
      <path
        d="M54.6018 12.6777L53.5524 19.3679H13.7349L17.4619 12.6777H54.6018Z"
        fill="currentColor"
      />
      <path
        d="M52.6128 25.3562L51.5562 32.0463H6.66553L10.3925 25.3562H52.6128Z"
        fill="currentColor"
      />
      <path
        d="M50.6151 38.0342L49.6743 44.0003H0L3.32899 38.0342H50.6151Z"
        fill="currentColor"
      />
    </svg>
  ),
  suitcase: (props: SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.6016 10.4948V7.3687C11.6016 6.50546 12.3326 5.80566 13.2344 5.80566H18.9492C19.851 5.80566 20.582 6.50546 20.582 7.3687V10.4948M6.70312 26.1251H26.2969C28.1004 26.1251 29.5625 24.7255 29.5625 22.999V13.6208C29.5625 11.8944 28.1004 10.4948 26.2969 10.4948H6.70312C4.89957 10.4948 3.4375 11.8944 3.4375 13.6208V22.999C3.4375 24.7255 4.89957 26.1251 6.70312 26.1251Z"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const IconComponent = icons[name] as
    | ComponentType<SVGProps<SVGSVGElement>>
    | undefined;
  return IconComponent ? <IconComponent {...props} /> : null;
}

export default Icon;