import Image from 'next/image';

export default function ResourceCard({ index }: { index: number }) {
  return (
    <div className='w-32 m-2 flex flex-col p-2 gap-2 items-center border-2 rounded-md'>
      <Image
        src={`https://picsum.photos/seed/${index}/100`}
        width={100}
        height={100}
        alt='Resource Thumbnail'
      />
      <p>Resource Name</p>
    </div>
  );
}
