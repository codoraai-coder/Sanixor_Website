// Built using Hyperiux Vault: https://vault.hyperiux.com
// Adapted for a client-routed, dark-themed site: header colours and slots are
// props, link clicks can be intercepted (SPA navigation), the closed panel is
// `inert` so its links are never reachable by Tab, and images carry captions.

import gsap from "gsap";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState, type RefObject } from "react";

/* ------------------------------------------------------------------ *
 * Focus trap — keeps keyboard focus inside a container while it's open,
 * restores it to the trigger on close.
 * ------------------------------------------------------------------ */

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const isVisible = (element?: HTMLElement | null): boolean => {
  if (!element || element.hidden) return false;
  const style = window.getComputedStyle(element);
  if (style.visibility === "hidden" || style.visibility === "collapse") return false;
  return element.getClientRects().length > 0;
};

const getFocusableElements = (container?: HTMLElement | null): HTMLElement[] => {
  if (!container) return [];
  return (Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)) as HTMLElement[]).filter(
    isVisible,
  );
};

interface UseFocusTrapParams {
  active: boolean;
  containerRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  onEscape?: () => void;
}

function useFocusTrap({ active, containerRef, initialFocusRef, onEscape }: UseFocusTrapParams) {
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusInitial = () => {
      const target = initialFocusRef?.current ?? getFocusableElements(container)[0] ?? container;
      if (!(target instanceof HTMLElement)) return;
      if (target === container && !container.hasAttribute("tabindex")) {
        container.setAttribute("tabindex", "-1");
      }
      target.focus();
    };

    const focusFrame = requestAnimationFrame(focusInitial);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscapeRef.current?.();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusableElements(container);
      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === first || !container.contains(activeElement)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (activeElement === last || !container.contains(activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [active, containerRef, initialFocusRef]);
}

/* ------------------------------------------------------------------ *
 * FullscreenNav — fixed header (brand + toggle) and a full-screen panel
 * that wipes open via clip-path from `clipOrigin`.
 * ------------------------------------------------------------------ */

const CLIPS = {
  bottom: {
    closedInitial: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    closedFinal: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  },
  top: {
    closedInitial: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    closedFinal: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  },
  left: {
    closedInitial: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    closedFinal: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
  },
  right: {
    closedInitial: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    closedFinal: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
  },
};

const REDUCED_MOTION_FADE_DURATION = 0.2;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;

export interface FullscreenNavLink {
  label: string;
  href: string;
}

export interface FullscreenNavProps {
  links?: FullscreenNavLink[];
  /** Brand text shown in the fixed header, linking to `brandHref`. */
  brand?: string;
  brandHref?: string;
  /** Replaces the plain-text brand link entirely (e.g. a logo lockup). */
  brandNode?: ReactNode;
  /** Extra header content rendered before the menu toggle. */
  headerActions?: (isOpen: boolean) => ReactNode;
  clipOrigin?: keyof typeof CLIPS;
  overlayBg?: string;
  linkColor?: string;
  linkHoverColor?: string;
  linkSizeClass?: string;
  headerClassName?: string;
  /** Slides the header out of view (e.g. while scrolling down). Ignored while open. */
  headerHidden?: boolean;
  openDuration?: number;
  closeDuration?: number;
  ease?: string;
  /** Header text / hamburger colour while the overlay is closed. */
  headerClosedColor?: string;
  /** Header text / hamburger colour while the overlay is open. */
  headerOpenColor?: string;
  onOpen?: () => void;
  onClose?: () => void;
  /** Fires as soon as the open state flips, before any animation. */
  onToggle?: (isOpen: boolean) => void;
  children?: (isOpen: boolean, close: () => void) => ReactNode;
}

export function FullscreenNav({
  links,
  brand = "Hyperiux",
  brandHref = "/",
  brandNode,
  headerActions,
  clipOrigin = "bottom",
  overlayBg = "#000000",
  linkColor = "#ffffff",
  linkHoverColor = "#a3a3a3",
  linkSizeClass = "text-5xl",
  headerClassName = "",
  headerHidden = false,
  openDuration = 1.2,
  closeDuration = 1.2,
  ease = "power4.inOut",
  headerClosedColor = "#000000",
  headerOpenColor = "#ffffff",
  onOpen,
  onClose,
  onToggle,
  children,
}: FullscreenNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLElement | null>(null);
  const linksWrapperRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const isAnimatingRef = useRef(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  const { closedInitial, open: openClipPath, closedFinal } = CLIPS[clipOrigin] ?? CLIPS.bottom;
  const isReducedMotion = prefersReducedMotion();
  const headerColor = isOpen ? headerOpenColor : headerClosedColor;

  const onOpenMenu = () => {
    setIsOpen(true);
    onToggle?.(true);
    timelineRef.current?.kill();

    gsap.set(overlayRef.current, { clipPath: closedInitial, autoAlpha: 1 });
    gsap.set(linksWrapperRef.current, { opacity: 1, scale: 1 });

    if (isReducedMotion) {
      gsap.set(overlayRef.current, { clipPath: openClipPath, autoAlpha: 0 });

      timelineRef.current = gsap.to(overlayRef.current, {
        autoAlpha: 1,
        duration: REDUCED_MOTION_FADE_DURATION,
        ease: "power2.out",
        onStart: () => {
          isAnimatingRef.current = true;
        },
        onComplete: () => {
          isAnimatingRef.current = false;
          onOpen?.();
        },
      });
      return;
    }

    const timeline = gsap.timeline({
      onStart: () => {
        isAnimatingRef.current = true;
      },
      onComplete: () => {
        isAnimatingRef.current = false;
        onOpen?.();
      },
    });

    timelineRef.current = timeline;

    timeline.to(overlayRef.current, {
      clipPath: openClipPath,
      duration: openDuration,
      delay: 0.1,
      ease,
    });
  };

  const onCloseMenu = () => {
    setIsOpen(false);
    onToggle?.(false);
    timelineRef.current?.kill();

    if (isReducedMotion) {
      gsap.set(linksWrapperRef.current, { scale: 1, opacity: 1 });

      timelineRef.current = gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: REDUCED_MOTION_FADE_DURATION,
        ease: "power2.out",
        onStart: () => {
          isAnimatingRef.current = true;
        },
        onComplete: () => {
          isAnimatingRef.current = false;
          gsap.set(overlayRef.current, { clipPath: closedFinal });
          onClose?.();
        },
      });
      return;
    }

    const timeline = gsap.timeline({
      onStart: () => {
        isAnimatingRef.current = true;
      },
      onComplete: () => {
        isAnimatingRef.current = false;
        onClose?.();
      },
    });

    timelineRef.current = timeline;

    timeline
      .to(linksWrapperRef.current, { scale: 0.94, opacity: 0.4, duration: 0.6, ease: "power2.in" })
      .to(overlayRef.current, { clipPath: closedFinal, duration: closeDuration, ease }, "<");
  };

  const onToggleMenu = () => {
    if (isAnimatingRef.current) return;
    if (isOpen) {
      onCloseMenu();
      return;
    }
    onOpenMenu();
  };

  // Link clicks must always be able to close the menu, even mid-animation.
  const closeFromLink = () => {
    if (isOpen) onCloseMenu();
  };

  const onLinkMouseEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.color = linkHoverColor;
  };

  const onLinkMouseLeave = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.color = linkColor;
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => () => void timelineRef.current?.kill(), []);

  useFocusTrap({
    active: isOpen,
    containerRef: rootRef,
    initialFocusRef: toggleButtonRef,
    onEscape: onCloseMenu,
  });

  const showHeader = isOpen || !headerHidden;

  return (
    <div ref={rootRef}>
      <header
        className={`fixed top-0 left-0 right-0 z-[120] flex h-20 items-center justify-between px-8 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none max-md:px-5 ${
          showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } ${headerClassName}`}
        style={{ color: headerColor }}
      >
        {brandNode ?? (
          <a
            href={brandHref}
            className="cursor-pointer text-lg font-semibold uppercase tracking-[0.15em] transition-colors duration-300 delay-700 motion-reduce:transition-none"
          >
            {brand}
          </a>
        )}

        <div className="flex items-center gap-3">
          {headerActions?.(isOpen)}
          <button
            ref={toggleButtonRef}
            type="button"
            onClick={onToggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="immersive-nav-panel"
            className="flex size-11 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full px-3"
          >
            <span
              style={{ backgroundColor: headerColor }}
              className={`block h-0.5 w-full transition-all duration-700 ease-in-out delay-300 motion-reduce:transition-none ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              style={{ backgroundColor: headerColor }}
              className={`block h-0.5 w-full transition-all duration-500 delay-300 motion-reduce:transition-none ${
                isOpen ? "scale-x-0 opacity-0" : ""
              }`}
            />
            <span
              style={{ backgroundColor: headerColor }}
              className={`block h-0.5 w-full transition-all duration-700 ease-in-out delay-300 motion-reduce:transition-none ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <nav
        id="immersive-nav-panel"
        ref={overlayRef}
        style={{ clipPath: closedInitial, backgroundColor: overlayBg }}
        className={`fixed inset-0 z-[110] flex flex-col items-center justify-center gap-2 overflow-y-auto ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isOpen}
        aria-label="Site navigation"
        inert={!isOpen}
      >
        <div
          ref={linksWrapperRef}
          className="flex min-h-screen w-full flex-col items-center justify-center motion-reduce:opacity-100"
        >
          {children
            ? children(isOpen, closeFromLink)
            : (links ?? []).map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={closeFromLink}
                  style={{ color: linkColor }}
                  onMouseEnter={onLinkMouseEnter}
                  onMouseLeave={onLinkMouseLeave}
                  className={`${linkSizeClass} font-normal tracking-tight transition-colors motion-reduce:transition-none`}
                >
                  {label}
                </a>
              ))}
        </div>
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * CustomNavbar — the fuller panel layout (links, image row, brand/tagline,
 * socials, location), passed as FullscreenNav's children render prop.
 * ------------------------------------------------------------------ */

const SOCIAL_ICONS: Record<string, ReactNode> = {
  instagram: <Instagram aria-hidden="true" className="h-6 w-6" strokeWidth={1.6} />,
  twitter: <Twitter aria-hidden="true" className="h-6 w-6" strokeWidth={1.6} />,
  linkedin: <Linkedin aria-hidden="true" className="h-6 w-6" strokeWidth={1.6} />,
  facebook: <Facebook aria-hidden="true" className="h-6 w-6" strokeWidth={1.6} />,
};

const DEFAULT_LINK_Y_OFFSET = 30;
const DEFAULT_LINK_DURATION = 0.8;
const DEFAULT_LINK_STAGGER = 0.07;
const DEFAULT_LINK_CHAR_STAGGER = 0.015;
const IMAGE_INITIAL_SCALE = 0.7;
const DEFAULT_IMAGE_START_SCALE = 0.8;
const DEFAULT_IMAGE_DURATION = 0.9;
const DEFAULT_IMAGE_STAGGER = 0.06;
const DEFAULT_SOCIAL_Y_OFFSET = 14;
const DEFAULT_SOCIAL_DURATION = 0.5;
const DEFAULT_SOCIAL_STAGGER = 0.06;
const HEADER_Y_OFFSET = -12;
const LOCATION_Y_OFFSET = 10;
const DELAY_OFFSET = 0.2;
const TAGLINE_DELAY_OFFSET = 0.08;
const IMAGE_DELAY_OFFSET = 0.1;
const SOCIAL_DELAY_OFFSET = 0.2;
const LOCATION_DELAY_OFFSET = 0.25;

/* Character-split hover reveal: each character sits above a text-shadow
   copy of itself and slides up on hover/focus, staggered per character. */
function NavLinkHover({
  label,
  href,
  charStagger,
  reduced,
  onClick,
  onActivate,
}: {
  label: string;
  href: string;
  charStagger: number;
  reduced: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  onActivate?: () => void;
}) {
  if (reduced) {
    return (
      <a href={href} onClick={onClick} onMouseEnter={onActivate} onFocus={onActivate}>
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className="group/link-hover inline-block no-underline"
    >
      <span className="sr-only">{label}</span>
      <span
        aria-hidden="true"
        className="relative inline-block overflow-hidden align-middle leading-[1.08]"
      >
        {[...label].map((char, index) => (
          <span
            key={index}
            className="relative inline-block whitespace-pre transition-transform duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] group-hover/link-hover:-translate-y-[1.2em] group-focus-visible/link-hover:-translate-y-[1.2em]"
            style={{
              textShadow: "0 1.2em currentColor",
              transitionDelay: `${index * charStagger}s`,
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </a>
  );
}

export interface CustomNavbarLink {
  label: string;
  href: string;
  /** Small index shown beside the link (e.g. "01"). */
  meta?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  /** Fires when the link is hovered or focused. */
  onActivate?: () => void;
}

export interface CustomNavbarSocial {
  type: string;
  href: string;
  label?: string;
}

export interface CustomNavbarImage {
  src: string;
  caption?: string;
  href?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export interface CustomNavbarProps {
  links?: CustomNavbarLink[];
  images?: (string | CustomNavbarImage)[];
  agencyName?: string;
  socials?: CustomNavbarSocial[];
  location?: string;
  tagline?: string;
  isOpen?: boolean;
  overlayBg?: string;
  delay?: number;
  linkOffsetY?: number;
  linkDuration?: number;
  linkStagger?: number;
  linkCharStagger?: number;
  imageStartScale?: number;
  imageDuration?: number;
  imageStagger?: number;
  socialOffsetY?: number;
  socialDuration?: number;
  socialStagger?: number;
  /** Optional decorative layer rendered behind the panel content. */
  backdrop?: ReactNode;
  /** Optional content rendered under the location (e.g. a CTA). */
  footerAction?: ReactNode;
  /** Replaces the image row with custom content (revealed like the images). */
  aside?: ReactNode;
}

export function CustomNavbar({
  links = [],
  images = [],
  agencyName = "",
  socials = [],
  location = "",
  tagline = "",
  isOpen = false,
  overlayBg = "#000000",
  delay = 1,
  linkOffsetY = DEFAULT_LINK_Y_OFFSET,
  linkDuration = DEFAULT_LINK_DURATION,
  linkStagger = DEFAULT_LINK_STAGGER,
  linkCharStagger = DEFAULT_LINK_CHAR_STAGGER,
  imageStartScale = DEFAULT_IMAGE_START_SCALE,
  imageDuration = DEFAULT_IMAGE_DURATION,
  imageStagger = DEFAULT_IMAGE_STAGGER,
  socialOffsetY = DEFAULT_SOCIAL_Y_OFFSET,
  socialDuration = DEFAULT_SOCIAL_DURATION,
  socialStagger = DEFAULT_SOCIAL_STAGGER,
  backdrop,
  footerAction,
  aside,
}: CustomNavbarProps) {
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLElement | null)[]>([]);
  const socialsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const agencyRef = useRef<HTMLParagraphElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const locationRef = useRef<HTMLDivElement | null>(null);
  const isReducedMotion = prefersReducedMotion();

  useEffect(() => {
    const targets = [
      ...linksRef.current,
      ...imagesRef.current,
      ...socialsRef.current,
      agencyRef.current,
      taglineRef.current,
      locationRef.current,
    ].filter(Boolean);
    gsap.killTweensOf(targets);

    if (!isOpen) return;

    gsap.set(linksRef.current, { y: linkOffsetY, opacity: 0 });
    gsap.set(imagesRef.current, { scale: IMAGE_INITIAL_SCALE, opacity: 0 });
    gsap.set(socialsRef.current, { y: socialOffsetY, opacity: 0 });
    gsap.set([agencyRef.current, taglineRef.current].filter(Boolean), {
      y: HEADER_Y_OFFSET,
      opacity: 0,
    });
    gsap.set(locationRef.current, { y: LOCATION_Y_OFFSET, opacity: 0 });

    if (prefersReducedMotion()) {
      gsap.set(targets, { y: 0, scale: 1, opacity: 1 });
      return;
    }

    const animationDelay = Math.max(delay - DELAY_OFFSET, 0);

    gsap.to(agencyRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      delay: animationDelay,
    });
    gsap.to(taglineRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      delay: animationDelay + TAGLINE_DELAY_OFFSET,
    });
    gsap.to(linksRef.current, {
      y: 0,
      opacity: 1,
      duration: linkDuration,
      ease: "power2.out",
      stagger: linkStagger,
      delay: animationDelay,
    });
    gsap.to(imagesRef.current, {
      scale: 1,
      opacity: 1,
      duration: imageDuration,
      ease: "power3.out",
      stagger: imageStagger,
      delay: animationDelay + IMAGE_DELAY_OFFSET,
      startAt: { scale: imageStartScale },
    });
    gsap.to(socialsRef.current, {
      y: 0,
      opacity: 1,
      duration: socialDuration,
      ease: "power2.out",
      stagger: socialStagger,
      delay: animationDelay + SOCIAL_DELAY_OFFSET,
    });
    gsap.to(locationRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      delay: animationDelay + LOCATION_DELAY_OFFSET,
    });
  }, [
    delay,
    imageDuration,
    imageStagger,
    imageStartScale,
    isOpen,
    linkDuration,
    linkOffsetY,
    linkStagger,
    socialDuration,
    socialOffsetY,
    socialStagger,
  ]);

  const normalisedImages = images
    .slice(0, 4)
    .map((image) => (typeof image === "string" ? { src: image } : image));

  return (
    <div
      style={{ backgroundColor: overlayBg }}
      className="relative flex min-h-screen w-full flex-col justify-between gap-10 overflow-hidden px-[7vw] pt-28 pb-10 text-white max-[1025px]:px-6 max-[1025px]:pt-24"
    >
      {backdrop}

      {(agencyName || tagline) && (
        <div className="relative flex flex-col gap-1">
          {agencyName && (
            <p ref={agencyRef} className="font-mono text-xs uppercase tracking-[0.24em] opacity-90">
              {agencyName}
            </p>
          )}
          {tagline && (
            <p ref={taglineRef} className="text-sm opacity-60">
              {tagline}
            </p>
          )}
        </div>
      )}

      <div className="relative flex items-center justify-between gap-10 max-[1025px]:flex-col max-[1025px]:items-start max-[1025px]:gap-12">
        <div className="flex flex-col">
          {links.map((link, index) => (
            <div
              key={link.label}
              ref={(element) => {
                linksRef.current[index] = element;
              }}
              className="flex items-start gap-4 text-[clamp(36px,min(5.2vw,8.6vh),96px)] font-semibold leading-[1.04] tracking-[-0.035em] [font-family:'Space_Grotesk_Variable','Space_Grotesk',sans-serif] max-[1025px]:text-[clamp(34px,min(9vw,7.4vh),72px)]"
              style={{ opacity: 0, transform: `translateY(${linkOffsetY}px)` }}
            >
              {link.meta && (
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] font-mono text-[11px] font-normal tracking-[0.2em] text-white/40"
                >
                  {link.meta}
                </span>
              )}
              <NavLinkHover
                label={link.label}
                href={link.href}
                charStagger={linkCharStagger}
                reduced={isReducedMotion}
                onClick={link.onClick}
                onActivate={link.onActivate}
              />
            </div>
          ))}
        </div>

        {aside && (
          <div
            ref={(element) => {
              imagesRef.current[0] = element;
            }}
            style={{ opacity: 0, transform: `scale(${IMAGE_INITIAL_SCALE})` }}
            className="max-[1025px]:hidden"
          >
            {aside}
          </div>
        )}

        {!aside && normalisedImages.length > 0 && (
          <div className="flex items-end gap-6 max-[1025px]:w-full max-[1025px]:gap-3 max-md:hidden">
            {normalisedImages.map((image, index) => {
              const content = (
                <>
                  <span className="relative block h-[16vw] w-[22vw] overflow-hidden rounded-xl border border-white/10 max-[1025px]:h-[28vw] max-[1025px]:w-[40vw]">
                    <img
                      src={image.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover/image:scale-105 motion-reduce:transition-none motion-reduce:group-hover/image:scale-100"
                    />
                  </span>
                  {image.caption && (
                    <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.2em] text-white/55 transition-colors group-hover/image:text-white">
                      {image.caption}
                    </span>
                  )}
                </>
              );
              const style = { opacity: 0, transform: `scale(${IMAGE_INITIAL_SCALE})` };
              return image.href ? (
                <a
                  key={image.src}
                  href={image.href}
                  onClick={image.onClick}
                  ref={(element) => {
                    imagesRef.current[index] = element;
                  }}
                  style={style}
                  className="group/image block"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={image.src}
                  ref={(element) => {
                    imagesRef.current[index] = element;
                  }}
                  style={style}
                  className="group/image"
                >
                  {content}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="relative flex items-end justify-between gap-6 max-md:flex-col max-md:items-start">
        <div className="flex items-end gap-6">
          {socials.map((social, index) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label ?? social.type}
              ref={(element) => {
                socialsRef.current[index] = element;
              }}
              className="text-white/70 transition-colors hover:text-white"
              style={{ opacity: 0, transform: `translateY(${socialOffsetY}px)` }}
            >
              {SOCIAL_ICONS[social.type]}
            </a>
          ))}
        </div>
        {(location || footerAction) && (
          <div
            ref={locationRef}
            className="flex items-center gap-6 text-sm text-white/60 max-md:w-full max-md:justify-between"
          >
            {location && <span>{location}</span>}
            {footerAction}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export interface ImmersiveFullscreenNavProps {
  navConfig?: Partial<FullscreenNavProps>;
  navContent?: Partial<CustomNavbarProps>;
}

/**
 * A fixed header (brand + hamburger) that wipes a full-screen nav panel open
 * via `clip-path`, then reveals a brand block, links, images and socials.
 * Respects `prefers-reduced-motion`: the wipe becomes a fade and every
 * staggered reveal an instant set.
 */
export default function ImmersiveFullscreenNav({
  navConfig = {},
  navContent = {},
}: ImmersiveFullscreenNavProps) {
  const overlayBg = navConfig.overlayBg ?? "#000000";
  return (
    <FullscreenNav {...navConfig} overlayBg={overlayBg}>
      {(isOpen) => (
        <CustomNavbar
          {...navContent}
          isOpen={isOpen}
          overlayBg={overlayBg}
          delay={navConfig.openDuration ?? 1.2}
        />
      )}
    </FullscreenNav>
  );
}
