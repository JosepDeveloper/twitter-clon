'use client';

import { useTweets } from '../hooks/use-tweets';
import { PostTweet } from './post-tweet';
import { Tweets } from './tweets';
import { Session } from 'next-auth';
import { useEffect, useRef } from 'react';

interface TweetsSectionsProps {
  session: Session | null;
  tweetsData: TweestType[];
}

function TweetsSections({ session, tweetsData }: TweetsSectionsProps): JSX.Element {
  const { tweets, updateTweets, updateTweetsSockets, loadMoreTweets, loading, hasMore } =
    useTweets(tweetsData);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Configura el Intersection Observer para infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMoreTweets();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, hasMore]);

  let isSession = false;
  if (session) {
    isSession = true;
  }

  return (
    <div className="border-x border-white/20 pt-5">
      <header className="min-h-40 px-6 pb-6">
        <PostTweet
          updateTweets={updateTweets}
          updateTweetsSockets={updateTweetsSockets}
          session={isSession}
          username={session?.user?.name as string}
          imageURL={session?.user?.image as string}
        />
      </header>

      <section>
        <ul className="list-none m-0 [&>li]:mt-0 [&>li]:px-6 [&>li]:border-t [&>li]:border-white/20 border-white/20 pb-6">
          {tweets.map((tweet, index) => (
            <li key={index} className="py-2">
              <Tweets
                textMarkdown={tweet.textMarkdown}
                nickname={tweet.nickname}
                urlImage={tweet.urlImage}
              />
            </li>
          ))}
        </ul>
        {/* Elemento para detectar cuándo el usuario llega al final */}
        <div ref={loaderRef} className="p-4">
          {loading && 'Cargando más tweets...'}
          {!hasMore && 'No hay más tweets para cargar.'}
        </div>
      </section>
    </div>
  );
}

export { TweetsSections };