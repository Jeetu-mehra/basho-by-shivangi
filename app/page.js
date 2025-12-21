import React from 'react';

const LandingPage = () => {
  return (
    <main className="landing-page">

      {/* Japanese philosopy, Matsuo Basho's philosopy, Basho brand founders and Basho brand  philosophy */}
      <section>

        {/* Japanese philosophy, and Matsuo Basho's philosophy */}
        <div>
          <div>
            <h2>The Beauty of Impermanence</h2>
            <p>Philosophy & Aesthetics</p>
          </div>
          <p>
            At the heart of Japanese culture lies <span className="italic">Wabi-sabi</span>—a 
            worldview centered on the acceptance of transience and imperfection. 
            It is a beauty that is "imperfect, impermanent, and incomplete."
          </p>
          <p>
            In our pottery, this manifests as a celebration of the artisan’s touch. 
            The slight asymmetry of a hand-thrown bowl or the unpredictable crackle 
            of a kiln’s glaze are not flaws, but the marks of a living object.
          </p>

          <h2>The Way of the Wanderer</h2>
          <p>The Spirit of Matsuo Bashō</p>

          <p>
            Matsuo Bashō, the 17th-century haiku master, viewed life as a journey 
            and art as a bridge to the eternal. His philosophy, <span className="italic">Fueki-Ryuko</span>, 
            reminds us that true art balances the timeless with the ephemeral.
          </p>
          <p>
            He taught the concept of <span className="italic">Karumi</span> (lightness)—finding 
            the profound within the ordinary. It is the same "lightness" we aim to 
            bring to your table: vessels that feel effortless yet carry the weight 
            of history.
          </p>
          <blockquote className="border-l-2 border-stone-300 pl-6 py-2 my-8 italic text-stone-600">
            "The temple bell stops— <br />
            but the sound keeps coming <br />
            out of the flowers."
          </blockquote>
          <p className="text-base font-sans leading-snug italic text-stone-500">
            Through Bashō’s eyes, we learn that a simple morning tea is a 
            poem in motion, and every cup is a sanctuary.
          </p>
        </div>

        {/* Basho Founders image and their names, Basho logo and brand philosophy */}
        <div>

        </div>
      </section>
      
      <div>Explore our Collections</div>

      {/* Explore section */}
      <section>
        {/* Tableware poducts container showing related images, serve as link to products search page */}
        <div>
          
        </div>

        {/* Custom poducts container showing related images, serve as link to gallery of custom page*/}
        <div>
          
        </div>
        
        {/* Hosted wrokshops photographs, serve as link to gallery of more photographs*/}
        <div>
          
        </div>

        {/* Hosted cultural events photographs, serve as a link to gallery of more photographs*/}
        <div>

        </div>
      </section>
    </main>
  );
};

export default LandingPage;