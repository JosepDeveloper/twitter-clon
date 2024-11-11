import Image from 'next/image'

interface AvatarProps {
  src: string
  name: string
  className?: string
}

function Avatar ({ src, name, className }: AvatarProps) {
  return (
    <Image
      src={src}
      alt={name}
      width={48}
      height={48}
      className={`rounded-full ${className}`}
    />
  )
}

export { Avatar }
