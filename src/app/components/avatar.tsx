import Image from 'next/image'

interface AvatarProps {
  src: string
  name: string
}

function Avatar ({ src, name }: AvatarProps) {
  return (
    <Image
      src={src}
      alt={name}
      width={48}
      height={48}
      className='rounded-full'
    />
  )
}

export { Avatar }
