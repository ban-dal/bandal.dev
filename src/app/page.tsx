import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button";
import { ViewTransition } from "@/components/ViewTransition";
import type { ContentItem } from "@/lib/content-utils";
import { getAllPosts, getAllNotes } from "@/lib/content-utils";
import { cn } from "@/lib/utils";

export default async function Home() {
  const posts = await getAllPosts();
  const notes = await getAllNotes();

  // 최근 콘텐츠 (블로그 및 노트)
  const recentPosts = posts.slice(0, 3);
  const recentNotes = notes.slice(0, 2);

  return (
    <ViewTransition>
      <div>
        <HeroSection />
        <RecentPostsSection posts={recentPosts} />
        <RecentNotesSection notes={recentNotes} />
        <AboutSection />
        <FooterSection />
      </div>
    </ViewTransition>
  );
}

function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 md:mb-24">
      <div className="md:w-7/12 animate-[fadeIn_0.8s_ease-in-out]">
        <h1
          className={cn(
            "text-4xl md:text-6xl font-bold mb-4",
            "text-heading font-serif",
            "transition-all duration-300",
            "leading-tight",
          )}
        >
          <span className="block mt-1 text-3xl md:text-5xl opacity-80 text-primary">
            bandal.dev
          </span>
        </h1>
        <p
          className={cn(
            "text-lg md:text-xl mb-6",
            "text-blockquote",
            "transition-all duration-300",
          )}
        >
          개발, 그리고 일상에 관한 이야기를 담은 공간이에요
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/blog"
            className={buttonVariants({
              className:
                "transition duration-300 hover:translate-y-[-2px] hover:shadow-lg",
            })}
          >
            블로그 보기
          </Link>
          <Link
            href="/notes"
            className={buttonVariants({
              variant: "outline",
              className:
                "transition duration-300 hover:translate-y-[-2px] hover:shadow-lg",
            })}
          >
            노트 둘러보기
          </Link>
        </div>
      </div>
      <Link
        href="/about"
        className={cn(
          "hidden md:block w-4/12 rounded-xl overflow-hidden",
          "shadow-lg transition duration-300 hover:shadow-xl hover:scale-[1.02]",
          "animate-[fadeIn_1s_ease-in-out]",
        )}
      >
        <div className="w-full bg-gradient-to-br flex items-center justify-center bg-[image:var(--gradient-primary)]">
          <div className="text-white text-center p-8">
            <Image
              src="/avatar.png"
              alt="BANDAL.DEV"
              width={100}
              height={100}
              className="rounded-full"
            />
            <div className="text-lg opacity-90">BANDAL.DEV</div>
          </div>
        </div>
      </Link>
    </section>
  );
}

function RecentPostsSection({ posts }: { posts: ContentItem[] }) {
  return (
    <section className="mb-16 animate-[fadeInUp_0.8s_ease-in-out_0.2s_backwards]">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-3xl font-bold text-heading font-serif">
          최근 블로그 포스트
        </h2>
        <Link
          href="/blog"
          className={buttonVariants({
            variant: "link",
            color: "primary",
            size: "sm",
          })}
        >
          모든 포스트 보기 →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map(({ meta }, index) => (
            <Link
              key={meta.slug}
              href={`/blog/${meta.slug}`}
              className="group"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <article
                className={cn(
                  "h-full p-6 rounded-xl border border-hr",
                  "transition duration-300 group-hover:shadow-md group-hover:translate-y-[-2px]",
                  "animate-[fadeInUp_0.5s_ease-in-out_backwards]",
                )}
                style={{
                  animationDelay: `${0.3 + index * 0.1}s`,
                }}
              >
                <ViewTransition name={`date-${meta.slug}`}>
                  <div className="mb-4">
                    <time className="text-sm text-blockquote">{meta.date}</time>
                  </div>
                </ViewTransition>
                <ViewTransition name={`title-${meta.slug}`}>
                  <h3 className="text-xl font-bold mb-2 text-heading transition group-hover:text-blue-500">
                    {meta.title}
                  </h3>
                </ViewTransition>
                <p className="line-clamp-3 text-sm text-blockquote">
                  {meta.description}
                </p>
              </article>
            </Link>
          ))
        ) : (
          <p className="text-blockquote">아직 작성된 포스트가 없습니다.</p>
        )}
      </div>
    </section>
  );
}

function RecentNotesSection({ notes }: { notes: ContentItem[] }) {
  return (
    <section className="mb-20 animate-[fadeInUp_0.8s_ease-in-out_0.4s_backwards]">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-3xl font-bold text-heading font-serif">
          최근 노트
        </h2>
        <Link
          href="/notes"
          className={buttonVariants({
            variant: "link",
            color: "primary",
            size: "sm",
          })}
        >
          모든 노트 보기 →
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {notes.length > 0 ? (
          notes.map(({ meta }, index) => (
            <Link
              key={meta.slug}
              href={`/notes/${meta.slug}`}
              className="group"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <article
                className={cn(
                  "h-full p-6 rounded-xl bg-gradient-to-br bg-[image:var(--gradient-note-card)]",
                  "transition duration-300 group-hover:shadow-md group-hover:translate-y-[-2px]",
                  "animate-[fadeInUp_0.5s_ease-in-out_backwards]",
                )}
                style={{
                  animationDelay: `${0.5 + index * 0.1}s`,
                }}
              >
                <ViewTransition name={`date-${meta.slug}`}>
                  <div className="mb-4">
                    <time className="text-sm text-blockquote">{meta.date}</time>
                  </div>
                </ViewTransition>
                <ViewTransition name={`title-${meta.slug}`}>
                  <h3 className="text-xl font-bold mb-2 text-heading transition group-hover:text-blue-500">
                    {meta.title}
                  </h3>
                </ViewTransition>
                <p className="line-clamp-2 text-sm text-blockquote">
                  {meta.description}
                </p>
              </article>
            </Link>
          ))
        ) : (
          <p className="text-blockquote">아직 작성된 노트가 없습니다.</p>
        )}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      className={cn(
        "mb-16 p-8 md:p-10 rounded-xl",
        "bg-[rgba(0,0,0,0.02)] bg-[image:var(--gradient-secondary)]",
        "transition duration-300 hover:shadow-lg",
        "animate-[fadeInUp_0.8s_ease-in-out_0.6s_backwards]",
      )}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-heading font-serif">
        소개
      </h2>
      <p className="text-lg mb-4 text-foreground">
        이 블로그는 Next.js의 내장된 기능을 사용하여 만들어졌어요. 새로운 지식을
        얻게되면 블로그에 기록해요.
      </p>
      <Link
        href="/about"
        className="inline-flex items-center font-medium text-primary transition hover:translate-x-1"
      >
        제가 궁금하다면 <span className="ml-1">→</span>
      </Link>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="mt-20 pt-8 border-t border-hr animate-[fadeIn_1s_ease-in-out_0.8s_backwards]">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-blockquote">
            © {new Date().getFullYear()} bandal.dev. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/ban-dal/bandal.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blockquote transition hover:opacity-80"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
