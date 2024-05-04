import { DetailedHTMLProps, HTMLAttributes } from "react"

const Skeleton = (
  { className, ...rest }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  return <span className={'block skeleton min-h-[50px] mx-auto '+className || ''} {...rest} />
}

export default Skeleton