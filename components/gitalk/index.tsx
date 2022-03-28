import dynamic from 'next/dynamic'

const GitalkAsync: any = dynamic(() => import('./gitalk').then(e => e.GitalkComponent), { ssr: false })

export default GitalkAsync
