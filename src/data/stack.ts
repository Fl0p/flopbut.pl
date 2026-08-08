/**
 * Tool names are proper nouns — they stay identical across locales, so only the
 * group headings live in the dictionaries. Order here is the order on the page:
 * AI leads, because that is where the work is now.
 */
export const STACK_GROUPS = ['ai', 'languages', 'mobile', 'delivery', 'cloud'] as const;

export type StackGroup = (typeof STACK_GROUPS)[number];

export const stack: Record<StackGroup, string[]> = {
  ai: [
    'Claude',
    'Codex',
    'Gemini',
    'AWS Bedrock',
    'MCP',
    'n8n',
    'Dify',
    'OpenAI API',
    'Vercel AI SDK',
  ],
  languages: ['Swift', 'Kotlin', 'Java', 'TypeScript', 'Objective-C', 'Ruby', 'Bash', 'Python'],
  mobile: ['SwiftUI', 'Combine', 'CoreData', 'React Native', 'Android SDK', 'Gradle', 'SPM'],
  delivery: ['Fastlane', 'Jenkins', 'GitHub Actions', 'Docker', 'Sentry', 'Firebase'],
  cloud: ['GCP', 'AWS', 'Cloudflare', 'DigitalOcean'],
};
