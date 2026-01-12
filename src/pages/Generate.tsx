import React, { use, useState } from 'react'
import { useParams } from 'react-router-dom'
import { colorSchemes, type AspectRatio, type IThumbnail, type ThumbnailStyle } from '../assets/assets';
import SoftBackdrop from '../components/SoftBackdrop';
import AspectRationSelector from '../components/AspectRationSelector';
import StyleSelector from '../components/StyleSelector';

const Generate = () => {

  const {id} = useParams();
  const [title, setTitle] = useState('')
    const [additionalDetails , setAdditionalDetails] = useState('')

      const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null)
        const [Loading, setLoading] = useState(false)

        const [aspectRatio,setaspectRatio] = useState<AspectRatio>('16:9')
        const [colorScheme , setcolorScheme] = useState<string>(colorSchemes[0].id)
        const [style,setStyle] = useState<ThumbnailStyle>('Bold & Graphics')

        const [styleDropdownOpen, setstyleDropdownOpen] = useState(false)

  return (
    <>
      <SoftBackdrop/>
      <div className='pt-24 min-h-screen'>
        <main className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8'>
         <div className='grid lg:grid-cols-[400px_1fr] gap-8'>
            {/* left panel */}
            <div className={`space-y-6 ${id && 'pointer-events-none'}`}>
               <div className='p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6'>
                  <div>
                    <h2 className='text-xl font-bold text-zinc-100 mb-1'>Create Your Thumbnail</h2>
                    <p className='text-sm text-zinc-400'>Describe your thinking , Let AI bring it to life.</p>
                  </div>

                  <div className='space-y-5'>
                    {/* Title input */}
                    <div className='space-y-2'>
                      <label className='block tm-sm font-medium'>Title or Topic</label>

                      <input type='Text' value={title} onChange={(e)=>setTitle(e.target.value)} maxLength={100} placeholder='e.g., 10 Tips for Better Sleep'
                      className='w-fulll px-4 py-3 rounded-lg border boredr-white/12 bg-black/20 text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-600'/>
                      <div className='flex justify-end'>
                        <span className='text=xs text-zinc-400'>{title.length}/100</span>
                      </div>
                    </div>
                     {/* AspectRationSelector */}
                     <AspectRationSelector value={aspectRatio} onChange={setaspectRatio}/>
                     
                     {/* StyleSelector */}
                     <StyleSelector value={style} onChange={setStyle} isOpen={styleDropdownOpen} SetIsOpen={setstyleDropdownOpen}/>
                     {/* ColorSchemeSelector */}

                        {/* Details */}
                        <div className='space-y-2'>
                          <label className='block text-sm font-medium'>
                            Additional Prompt <span className='text-zinc-400 text-xs'>(optional)</span>
                          </label>
                          <textarea value={additionalDetails} onChange={(e)=>setAdditionalDetails(e.target.value)} rows={3} 
                            placeholder='Add any specific detail , theme , mood or style preferences...'
                            className='w-full px-4 py-3 rounded-lg border border-white/10 ng-white/6 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none '></textarea>
                        </div>

                  </div>
                  {/* Button */}

                  {!id && (
                    <button className='text-[15px] w-full py-3.5 rounded-xl font-medium bg-linear-to-b from-pink-500 to-pink-600 hover:from-pink-700 disabled:cursor-not-allowed transition-colors'>
                      {Loading ? 'Generating...' : 'Generate Thumbnail'}
                    </button>
                  )}
               </div>
            </div>
            {/* right panel */}
            <div></div>
         </div>
        </main>

      </div>
    </>
  )
}

export default Generate
