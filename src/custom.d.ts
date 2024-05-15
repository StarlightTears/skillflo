declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const styleSheet: string;
  export = styleSheet;
}

declare module '*.css?raw' {
  const styleSheet: string;
  export = styleSheet;
}

declare module '*.png' {
  const url: string;
  export = url;
}

declare module '*.jpg' {
  const url: string;
  export = url;
}
