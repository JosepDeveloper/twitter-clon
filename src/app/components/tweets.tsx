import Markdown from 'react-markdown'
import reactGmf from 'remark-gfm'
import remarkDirective from 'remark-directive'
import './style/markdown.css'

const markdown = `# Hello World

It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less.

\`sudo apt update\`

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Cell 2   | Cell 3   |
| Row 2    | Cell 5   | Cell 6   |
| Row 3    | Cell 8   | Cell 9   |


Esto es un lista
- Item 1
- Item 2
- Item 3
`

function Tweets () {
  return (
    <ul className='list-none m-0 [&>li]:mt-0 border-b border-white/20 px-6 pb-6'>
      <li className=''>
        <Markdown remarkPlugins={[reactGmf, remarkDirective]}>{markdown}</Markdown>
      </li>
    </ul>
  )
}

export { Tweets }
