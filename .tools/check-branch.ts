const proc = Bun.spawn(['git', 'branch', '--show-current']);
const text = await new Response(proc.stdout).text();
const branch = text.trim();

const blacklistedBranches = ['main', 'develop'];

if (blacklistedBranches.includes(branch)) {
  const error = new Error(`Cannot push on branch "${branch}"`);

  const password = process.env.YOU_WONT_GUESS;

  if (password === undefined || password === '') {
    throw error;
  }

  const isMatch = await Bun.password.verify(
    password,
    '$argon2id$v=19$m=256,t=16,p=1$dmavRLWmFK33sOk3w/GFBZbPwyQCctzu3vOrVXg58Hc$PH1lduk8yO5PRbW/lZ2ii4g5NKuXP15aiHUTPIQTjlQ',
  );

  if (isMatch) {
    process.exit(0);
  }

  throw error;
}

const isLowercase = (txt: string) => txt === txt.toLowerCase();

if (!isLowercase(branch)) {
  throw new Error(`Branch "${branch}" should be lowercase`);
}

const prefixWhitelist = ['feature/', 'release/', 'hotfix/'];

if (!prefixWhitelist.some((prefix) => branch.startsWith(prefix))) {
  throw new Error(
    `Branch "${branch}" should start with one of ${prefixWhitelist.join(', ')}`,
  );
}

const casingRegex = /([\dA-Za-z]+)(\/)+([\dA-Za-z]+)((-)*([\dA-Za-z]+))*/;

const match = branch.match(casingRegex);
const wholeMatch = match && match[0];

if (wholeMatch !== branch) {
  throw new Error(
    `Branch "${branch}" should be in kebab-case, e.g. "feature/my-feature"`,
  );
}
