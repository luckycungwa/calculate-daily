import { CalculatorMeta } from '../../types';

export const TECH_CALCULATORS: CalculatorMeta[] = [
  {
    id: 'ip-subnet',
    slug: 'ip-subnet-calculator',
    name: 'IP Subnet Calculator',
    shortDesc: 'Work out the network address, broadcast, usable host range, mask, and wildcard from an IPv4 address and prefix.',
    tagline: 'Network, broadcast, and host range from any prefix.',
    category: 'tech',
    iconName: 'Network',
    badge: 'Networking',
    featured: true,
    keywords: [
      'ip subnet calculator',
      'subnet mask calculator',
      'cidr calculator',
      'network address calculator',
      'usable host range',
      'broadcast address calculator',
      'ipv4 subnet',
    ],
    kind: 'custom',
    componentId: 'IpSubnetCalculator',
    content: {
      intro:
        'The IP Subnet Calculator takes an IPv4 address and prefix length and returns the network address, subnet mask, wildcard mask, broadcast address, first and last usable host, and how many hosts fit. It is the arithmetic behind every subnetting question, done without a lookup table.',
      howItWorks:
        'The address is converted to a 32-bit integer. The mask has the first prefix bits set to one and the rest to zero, so a bitwise AND keeps only the network bits. Broadcasting sets every host bit to one. The usable range excludes the network and broadcast addresses, except for /31 point-to-point links and /32 single hosts.',
      example:
        'For 192.168.1.10/24 the mask is 255.255.255.0, so the network is 192.168.1.0 and the broadcast is 192.168.1.255. Usable hosts run from 192.168.1.1 to 192.168.1.254 — 254 of the 256 addresses. A /30 leaves just two usable hosts on a 10.0.0.4 network.',
      formulas: [
        {
          label: 'Network address',
          expression: 'Network = IP AND mask',
        },
        {
          label: 'Broadcast address',
          expression: 'Broadcast = Network OR (NOT mask)',
        },
        {
          label: 'Usable hosts',
          expression: 'Hosts = 2^(32 − prefix) − 2',
          note: 'The −2 removes the network and broadcast addresses. /31 and /32 are special-cased.',
        },
      ],
      sources: [
        {
          label: 'RFC 950 — Internet Standard Subnetting Procedure',
          expression: 'Subnet masks and the network/broadcast convention',
          note: 'Defines subnetting and reserves the all-zeros and all-ones host values.',
        },
        {
          label: 'RFC 4632 — Classless Inter-domain Routing (CIDR)',
          expression: 'Prefix-length notation and aggregation',
          note: 'CIDR replaced classful addressing with the /n prefix notation used here.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Network address',
          explanation:
            'The first address in the block, with all host bits cleared. It identifies the subnet and is not assignable to a host.',
        },
        {
          resultLabel: 'Usable host range',
          explanation:
            'The addresses you can actually assign. The network and broadcast addresses are excluded because they have special meanings on the link.',
        },
        {
          resultLabel: 'Wildcard mask',
          explanation:
            'The bitwise inverse of the subnet mask, used by access control lists and routing protocols to match address ranges.',
        },
      ],
      workflowLinks: [
        { slug: 'binary-to-decimal-calculator', step: 'See the octets and mask bits in binary.' },
        { slug: 'download-time-calculator', step: 'Estimate transfer time across the link you are planning.' },
        { slug: 'data-storage-converter', step: 'Convert the payload size into the right units.' },
      ],
      faqs: [
        {
          q: 'How many usable hosts does a /24 have?',
          a: 'A /24 contains 256 addresses. Subtracting the network and broadcast addresses leaves 254 usable hosts. The general rule is 2 to the power of the host bits, minus two.',
        },
        {
          q: 'Why does a /31 have two usable addresses?',
          a: 'RFC 3021 allows /31 for point-to-point links, where there is no need for a network or broadcast address. Both addresses can be assigned, which is why the usual minus-two rule does not apply.',
        },
        {
          q: 'What is the difference between a subnet mask and a wildcard mask?',
          a: 'A subnet mask has ones for the network bits and zeros for hosts. A wildcard mask is the exact inverse: zeros where the address must match and ones where it can vary. Cisco ACLs use wildcard masks.',
        },
        {
          q: 'Does this work for IPv6?',
          a: 'No. This calculator is IPv4-only because the arithmetic and host conventions differ substantially in IPv6. Entering 128-bit notation will be rejected rather than silently mis-computed.',
        },
      ],
      related: ['binary-to-decimal-calculator', 'download-time-calculator', 'data-storage-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'aspect-ratio',
    slug: 'aspect-ratio-calculator',
    name: 'Aspect Ratio Calculator',
    shortDesc: 'Scale a width or height to a given aspect ratio and see the resulting dimensions and megapixels.',
    tagline: 'Resize without stretching the picture.',
    category: 'tech',
    iconName: 'Image',
    badge: 'Design',
    featured: true,
    keywords: [
      'aspect ratio calculator',
      'resize aspect ratio',
      '16:9 calculator',
      'image ratio calculator',
      'video aspect ratio',
      'aspect ratio converter',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'ratioW', label: 'Ratio width', type: 'number', defaultValue: 16, min: 1, step: 1 },
        { id: 'ratioH', label: 'Ratio height', type: 'number', defaultValue: 9, min: 1, step: 1 },
        { id: 'width', label: 'Known width', type: 'number', defaultValue: 1920, min: 1, step: 1, suffix: 'px' },
        { id: 'height', label: 'Known height', type: 'number', defaultValue: 1080, min: 1, step: 1, suffix: 'px' },
      ],
      results: [
        {
          label: 'Height that matches this width',
          formulaCode: 'width * ratioH / ratioW',
          suffix: 'px',
          accent: true,
        },
        {
          label: 'Width that matches this height',
          formulaCode: 'height * ratioW / ratioH',
          suffix: 'px',
        },
        { label: 'Ratio as a decimal', formulaCode: 'ratioW / ratioH' },
        {
          label: 'Megapixels at the known width',
          formulaCode: '(width * (width * ratioH / ratioW)) / 1000000',
          suffix: 'MP',
        },
      ],
      formulaDescription: 'Height = Width × (ratio height / ratio width); Width = Height × (ratio width / ratio height)',
      tips: [
        'Enter the ratio in whole numbers: 16 and 9, 4 and 3, 21 and 9. Decimal ratios such as 1.85 are easier as 185 and 100.',
        'Rounding is unavoidable when a ratio does not divide evenly — 1920 × 1080 is exact, but 1000 × 563 is not.',
        'Changing one dimension without the other is what stretches photos and video.',
      ],
    },
    content: {
      intro:
        'The Aspect Ratio Calculator keeps an image, video, or canvas in proportion. Enter the ratio and one known dimension, and it returns the matching other dimension, the ratio as a decimal, and the megapixel count.',
      howItWorks:
        'An aspect ratio is width divided by height. To keep it, multiply the known dimension by the ratio term for the other side. If you know the width, height is width times ratio height over ratio width; if you know the height, width is height times ratio width over ratio height.',
      example:
        'For 16:9 with a 1920 px width, the matching height is 1920 × 9 / 16 = 1080 px, which is 2.07 megapixels. Going the other way, a 1080 px height gives 1080 × 16 / 9 = 1920 px. A 1000 px width would need 562.5 px, so round to 563 and accept a fraction of a percent of distortion.',
      formulas: [
        {
          label: 'Matching height',
          expression: 'Height = Width × ratio height / ratio width',
        },
        {
          label: 'Matching width',
          expression: 'Width = Height × ratio width / ratio height',
        },
        {
          label: 'Megapixels',
          expression: 'MP = Width × Height / 1,000,000',
        },
      ],
      sources: [
        {
          label: 'ITU-R BT.709 — Parameter values for HDTV',
          expression: '16:9 aspect ratio for high-definition television',
          note: 'BT.709 established 16:9 as the HDTV production and display ratio.',
        },
        {
          label: 'W3C — CSS Values and Units Level 4',
          expression: 'aspect-ratio property',
          note: 'CSS now lets layout preserve an intrinsic ratio, which is the same arithmetic applied by the browser.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Height that matches this width',
          explanation:
            'The height that preserves the ratio at your width. Round to a whole pixel and check that the visible difference is acceptable.',
        },
        {
          resultLabel: 'Megapixels at the known width',
          explanation:
            'Total pixel count, useful for estimating file size, memory use, and whether a crop still has enough resolution.',
        },
      ],
      workflowLinks: [
        { slug: 'pixels-per-inch-calculator', step: 'Check the physical density of the resulting resolution.' },
        { slug: 'download-time-calculator', step: 'Estimate how long the exported file takes to transfer.' },
        { slug: 'hex-to-rgb-converter', step: 'Match the export background colour to the design.' },
      ],
      faqs: [
        {
          q: 'What is the difference between 16:9 and 16:10?',
          a: '16:9 is wider and is the standard for video and most modern displays. 16:10 is slightly taller and was common on laptops because it leaves more vertical room for documents and toolbars.',
        },
        {
          q: 'How do I resize an image without distortion?',
          a: 'Change only one dimension and let the other follow the ratio, or crop instead of stretching. If you must hit an exact pixel size, crop the excess rather than scaling each axis independently.',
        },
        {
          q: 'Why is my computed dimension a decimal?',
          a: 'Most ratios do not divide the chosen width evenly. 16:9 at 1000 px gives 562.5. Round to the nearest whole pixel; the resulting ratio differs by a fraction of a percent, which is invisible.',
        },
        {
          q: 'What ratio should I use for social video?',
          a: 'Vertical 9:16 for Reels, Shorts, and TikTok, square 1:1 for feed posts, and 16:9 for landscape YouTube. Check the current platform specification before export, because safe areas differ too.',
        },
      ],
      related: ['pixels-per-inch-calculator', 'hex-to-rgb-converter', 'contrast-ratio-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'pixels-per-inch',
    slug: 'pixels-per-inch-calculator',
    name: 'Pixels Per Inch Calculator',
    shortDesc: 'Calculate display PPI, dot pitch, and megapixels from resolution and diagonal size.',
    tagline: 'How sharp is that screen, really?',
    category: 'tech',
    iconName: 'Monitor',
    badge: 'Displays',
    keywords: [
      'pixels per inch calculator',
      'ppi calculator',
      'dpi calculator',
      'screen density calculator',
      'display ppi',
      'dot pitch calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'widthPx', label: 'Horizontal resolution', type: 'number', defaultValue: 3840, min: 1, step: 1, suffix: 'px' },
        { id: 'heightPx', label: 'Vertical resolution', type: 'number', defaultValue: 2160, min: 1, step: 1, suffix: 'px' },
        { id: 'diagonal', label: 'Diagonal size', type: 'number', defaultValue: 27, min: 0.1, step: 0.1, suffix: 'in' },
      ],
      results: [
        {
          label: 'Pixels per inch',
          formulaCode: 'Math.sqrt(widthPx ** 2 + heightPx ** 2) / diagonal',
          suffix: 'PPI',
          accent: true,
        },
        {
          label: 'Dot pitch',
          formulaCode: '25.4 / (Math.sqrt(widthPx ** 2 + heightPx ** 2) / diagonal)',
          suffix: 'mm',
        },
        { label: 'Total pixels', formulaCode: '(widthPx * heightPx) / 1000000', suffix: 'MP' },
        { label: 'Aspect ratio (decimal)', formulaCode: 'widthPx / heightPx' },
      ],
      formulaDescription: 'PPI = √(width² + height²) / diagonal inches',
      tips: [
        'PPI is a property of the physical display. DPI usually refers to printing, where dots of ink are not the same as pixels of light.',
        'Around 110 PPI is a typical desktop monitor; phones often exceed 400 PPI.',
        'Dot pitch is the centre-to-centre distance between pixels, so lower is sharper.',
      ],
    },
    content: {
      intro:
        'The Pixels Per Inch Calculator converts a resolution and a diagonal measurement into pixel density, dot pitch, total megapixels, and the aspect ratio. It answers the question a specification sheet hides: how close together are the pixels on this screen?',
      howItWorks:
        'The Pythagorean theorem gives the diagonal in pixels from the width and height. Dividing that by the diagonal in inches gives pixels per inch. Dot pitch is the physical distance between pixel centres, so it is 25.4 mm divided by PPI.',
      example:
        'A 3840 × 2160 panel at 27 inches has 4406.9 diagonal pixels, which is about 163.2 PPI. Dot pitch is 25.4 / 163.2 = 0.156 mm, and the panel has 8.29 megapixels at a 16:9 ratio.',
      formulas: [
        {
          label: 'Pixel density',
          expression: 'PPI = √(width² + height²) / diagonal',
        },
        {
          label: 'Dot pitch',
          expression: 'Dot pitch (mm) = 25.4 / PPI',
        },
        {
          label: 'Total pixels',
          expression: 'Megapixels = width × height / 1,000,000',
        },
      ],
      sources: [
        {
          label: 'W3C — CSS Values and Units Level 4',
          expression: 'Reference pixel and device pixel ratio',
          note: 'CSS defines a reference pixel for layout, which is why physical PPI and CSS pixel density are not the same thing.',
        },
        {
          label: 'ISO 9241-307 — Ergonomics of human-system interaction',
          expression: 'Display measurement and pixel defect classes',
          note: 'Part 307 covers flat-panel display measurements, including how physical dimensions are specified.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Pixels per inch',
          explanation:
            'Physical pixel density. Higher values give smoother text and less visible pixel structure at normal viewing distance.',
        },
        {
          resultLabel: 'Dot pitch',
          explanation:
            'The distance between pixel centres in millimetres. It is the reciprocal measure of PPI, so 0.16 mm corresponds to roughly 160 PPI.',
        },
      ],
      workflowLinks: [
        { slug: 'aspect-ratio-calculator', step: 'Check the panel ratio or plan a matching canvas.' },
        { slug: 'download-time-calculator', step: 'Estimate transfer time for high-resolution media.' },
        { slug: 'data-storage-converter', step: 'Convert file sizes between units.' },
      ],
      faqs: [
        {
          q: 'Is PPI the same as DPI?',
          a: 'Not quite. PPI counts pixels in a display or image; DPI counts dots of ink a printer lays down. Marketing often mixes them, but for screens the correct term is PPI.',
        },
        {
          q: 'Does higher PPI always look better?',
          a: 'Up to a point. Beyond roughly 300 PPI at normal viewing distance, most people cannot resolve individual pixels. Contrast, colour accuracy, and viewing distance matter more than a density number alone.',
        },
        {
          q: 'How do I calculate PPI from resolution and diagonal?',
          a: 'Square the horizontal and vertical pixel counts, add them, take the square root to get the diagonal in pixels, then divide by the diagonal in inches. A 1920 × 1080 panel at 24 inches is about 91.8 PPI.',
        },
        {
          q: 'Why does my operating system report a different DPI?',
          a: 'Operating systems use a logical or scaled DPI for layout, especially with display scaling. That number is a UI setting, not the physical density of the panel.',
        },
      ],
      related: ['aspect-ratio-calculator', 'download-time-calculator', 'data-storage-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'download-time',
    slug: 'download-time-calculator',
    name: 'Download Time Calculator',
    shortDesc: 'Estimate how long a file takes to download from its size and your connection speed.',
    tagline: 'Minutes, not marketing megabits.',
    category: 'tech',
    iconName: 'Timer',
    badge: 'Networking',
    keywords: [
      'download time calculator',
      'file transfer time calculator',
      'how long to download',
      'bandwidth calculator',
      'mbps to minutes',
      'upload time calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'fileSize', label: 'File size', type: 'number', defaultValue: 1500, min: 0, step: 10, suffix: 'MB' },
        { id: 'speed', label: 'Connection speed', type: 'number', defaultValue: 100, min: 0.01, step: 1, suffix: 'Mbps' },
        { id: 'efficiency', label: 'Real-world efficiency', type: 'number', defaultValue: 90, min: 1, max: 100, step: 1, suffix: '%' },
      ],
      results: [
        {
          label: 'Download time',
          formulaCode: '(fileSize * 8) / (speed * efficiency / 100)',
          suffix: 'seconds',
          accent: true,
        },
        {
          label: 'Download time',
          formulaCode: '((fileSize * 8) / (speed * efficiency / 100)) / 60',
          suffix: 'minutes',
        },
        {
          label: 'Download time',
          formulaCode: '((fileSize * 8) / (speed * efficiency / 100)) / 3600',
          suffix: 'hours',
        },
        {
          label: 'Effective throughput',
          formulaCode: '(speed * efficiency / 100) / 8',
          suffix: 'MB/s',
        },
      ],
      formulaDescription: 'Seconds = (File size in MB × 8) / (Speed in Mbps × efficiency)',
      tips: [
        'Connection speeds are quoted in megabits per second; file sizes are usually in megabytes. Multiply megabytes by 8 to compare like with like.',
        'No link runs at 100% of its headline rate. Overhead, Wi-Fi contention, and server limits typically cost 5–20%.',
        'The slowest hop governs: a fast connection to a slow server still downloads slowly.',
      ],
    },
    content: {
      intro:
        'The Download Time Calculator converts a file size and a connection speed into seconds, minutes, and hours, with an efficiency allowance for the gap between a headline speed and real throughput.',
      howItWorks:
        'File sizes are in bytes and connection speeds in bits, so the size is multiplied by eight. Dividing by the effective speed in megabits per second gives seconds. Efficiency reduces the headline speed to reflect protocol overhead, Wi-Fi contention, and server throttling.',
      example:
        'A 1,500 MB file over a 100 Mbps connection at 90% efficiency takes 1,500 × 8 / 90 = 133.3 seconds, or about 2.2 minutes. Throughput is 11.25 MB/s. At 50% efficiency the same file takes four minutes.',
      formulas: [
        {
          label: 'Transfer time',
          expression: 'Seconds = (Size in MB × 8) / (Speed in Mbps × efficiency)',
        },
        {
          label: 'Effective throughput',
          expression: 'MB/s = Mbps × efficiency / 8',
        },
      ],
      sources: [
        {
          label: 'IEC 80000-13 — Quantities and units: information science',
          expression: 'Definitions of the bit, byte, and binary prefixes',
          note: 'Clarifies why MB and Mbps differ by a factor of eight, and the difference between decimal and binary prefixes.',
        },
        {
          label: 'RFC 6298 — Computing TCP Retransmission Timer',
          expression: 'Retransmission and round-trip overhead',
          note: 'Illustrates why real throughput sits below the link rate, particularly on high-latency paths.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Download time in seconds',
          explanation:
            'The raw transfer estimate at your chosen efficiency. It excludes connection setup, authentication, and any time spent waiting on the server.',
        },
        {
          resultLabel: 'Effective throughput',
          explanation:
            'The megabytes per second you should actually expect, after the efficiency allowance. Compare it with the MB/s figure a download manager reports.',
        },
      ],
      workflowLinks: [
        { slug: 'data-storage-converter', step: 'Convert between MB, GB, and binary units first.' },
        { slug: 'pixels-per-inch-calculator', step: 'Work out how large a high-resolution file will be.' },
        { slug: 'aspect-ratio-calculator', step: 'Plan the export dimensions before transferring media.' },
      ],
      faqs: [
        {
          q: 'Why is my download slower than the speed I pay for?',
          a: 'The headline figure is a link rate in megabits per second, not megabytes. Divide by eight for the theoretical MB/s, then subtract overhead. A 100 Mbps line tops out near 12.5 MB/s, and usually delivers 10–11 MB/s.',
        },
        {
          q: 'Does distance affect download speed?',
          a: 'Yes. Higher latency increases the impact of TCP slow start and retransmissions, so a distant server can be slower even on the same connection. Throughput also depends on the server\u2019s upload capacity.',
        },
        {
          q: 'What efficiency should I enter?',
          a: 'Ninety percent is a reasonable wired default. Use 70–80% for congested Wi-Fi or busy shared connections, and lower still for mobile networks or intercontinental transfers.',
        },
        {
          q: 'Can I use this for uploads?',
          a: 'Yes, the arithmetic is identical, but upload speeds are often a fraction of download speeds on residential connections. Enter your measured upload rate rather than the advertised download rate.',
        },
      ],
      related: ['data-storage-converter', 'pixels-per-inch-calculator', 'aspect-ratio-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'binary-to-decimal',
    slug: 'binary-to-decimal-calculator',
    name: 'Binary to Decimal Calculator',
    shortDesc: 'Convert a value between binary, octal, decimal, and hexadecimal in one step.',
    tagline: 'Every base, one conversion.',
    category: 'tech',
    iconName: 'Binary',
    badge: 'Programming',
    featured: true,
    keywords: [
      'binary to decimal calculator',
      'decimal to binary',
      'hex to decimal',
      'binary converter',
      'octal converter',
      'number base converter',
      'binary to hex',
    ],
    kind: 'custom',
    componentId: 'NumberBaseConverter',
    content: {
      intro:
        'The Binary to Decimal Calculator converts a number between base 2, 8, 10, and 16 at once. Choose the base you are typing in and it returns the same value in the other three, which is exactly what you need when reading a bitmask, a file header, or a memory address.',
      howItWorks:
        'A positional number system weights each digit by a power of its base. Parsing sums those weighted digits; formatting repeatedly divides by the target base to produce digits. Binary groups into four bits per hex digit, which is why hexadecimal is a compact way to write byte values.',
      example:
        'The binary value 11111111 is 255 in decimal, 377 in octal, and ff in hexadecimal — one byte with every bit set. Adding a 0b or 0x prefix is accepted and stripped, and spaces are ignored so you can paste grouped bits.',
      formulas: [
        {
          label: 'Positional value',
          expression: 'Value = Σ digitᵢ × baseⁱ',
          note: 'The rightmost digit has index 0.',
        },
        {
          label: 'Binary to hex',
          expression: 'Group bits in fours from the right; each group is one hex digit',
        },
      ],
      sources: [
        {
          label: 'RFC 4648 — The Base16, Base32, and Base64 Data Encodings',
          expression: 'Base16 alphabet 0–9 and A–F',
          note: 'Defines the hexadecimal digit set used for byte-oriented encodings.',
        },
        {
          label: 'IEEE 754-2019 — Standard for Floating-Point Arithmetic',
          expression: 'Bit-level representation of numbers',
          note: 'Floating-point formats are specified in binary, which is why bit patterns are often read in hex.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Decimal value',
          explanation:
            'The value in base 10, which is the form most other calculations expect. Conversion is exact for integers within the safe integer range.',
        },
        {
          resultLabel: 'Hexadecimal',
          explanation:
            'Four bits per digit, so one byte is always two hex digits. This is why memory dumps and colour codes use hex.',
        },
      ],
      workflowLinks: [
        { slug: 'ip-subnet-calculator', step: 'See how a prefix masks an address at the bit level.' },
        { slug: 'password-entropy-calculator', step: 'Understand the size of a keyspace in bits.' },
        { slug: 'hex-to-rgb-converter', step: 'Turn a hex colour code into its channels.' },
      ],
      faqs: [
        {
          q: 'How do I convert binary to decimal by hand?',
          a: 'Write the place values 1, 2, 4, 8, 16 and so on from right to left, then add the place values where the bit is 1. For 1011 that is 8 + 2 + 1 = 11.',
        },
        {
          q: 'Why does hexadecimal use letters?',
          a: 'Base 16 needs sixteen distinct digits, but only ten numeral symbols exist. The letters A to F stand for the values 10 to 15, so a byte fits in exactly two characters.',
        },
        {
          q: 'Does this handle negative numbers?',
          a: 'It converts the digits as an unsigned value. Negative numbers in computing are usually two\u2019s complement bit patterns, which look like a large positive number when read unsigned. Interpret the result as a signed integer only if you know the bit width.',
        },
        {
          q: 'What is the largest value I can convert?',
          a: 'Anything up to 9,007,199,254,740,991, the largest integer JavaScript represents exactly. Larger values would silently lose precision, so the tool rejects them instead.',
        },
      ],
      related: ['ip-subnet-calculator', 'password-entropy-calculator', 'hex-to-rgb-converter'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.9 },
  },
  {
    id: 'password-entropy',
    slug: 'password-entropy-calculator',
    name: 'Password Entropy Calculator',
    shortDesc: 'Estimate password entropy in bits and how long an offline attacker would need to crack it.',
    tagline: 'Bits of security, not vibes.',
    category: 'tech',
    iconName: 'KeyRound',
    badge: 'Security',
    keywords: [
      'password entropy calculator',
      'password strength calculator',
      'entropy bits',
      'password crack time',
      'how strong is my password',
      'brute force time calculator',
    ],
    kind: 'custom',
    componentId: 'PasswordEntropyCalculator',
    content: {
      intro:
        'The Password Entropy Calculator estimates the size of a password\u2019s search space in bits and converts it into an offline cracking time. It is a planning tool for password policy, not a check on a specific secret — nothing you type is stored or sent anywhere.',
      howItWorks:
        'Entropy is the password length multiplied by the base-2 logarithm of the character pool. An eight-character password drawn from 26 lowercase letters has about 37.6 bits; the same length from 94 printable characters has about 52.4 bits. Crack time divides half the keyspace by a guess rate, here one trillion guesses per second.',
      example:
        'A random 16-character password using all four character sets has a pool of 94 and about 105 bits of entropy. At a trillion guesses per second, the expected time is astronomically long. An 8-character lowercase-only password has 37.6 bits and falls in a fraction of a second.',
      formulas: [
        {
          label: 'Entropy',
          expression: 'Bits = length × log₂(pool size)',
        },
        {
          label: 'Expected crack time',
          expression: 'Seconds ≈ 2^(bits − 1) / guesses per second',
        },
      ],
      sources: [
        {
          label: 'NIST SP 800-63B — Digital Identity Guidelines',
          expression: 'Entropy, length, and rate limiting',
          note: 'Recommends length and blocklist checks over forced composition rules, and rate-limited verification.',
        },
        {
          label: 'OWASP — Password Storage Cheat Sheet',
          expression: 'Fast hashes fall quickly to offline attack',
          note: 'Explains why a leaked unsalted fast hash can be attacked at enormous rates.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Entropy in bits',
          explanation:
            'The base-2 log of the number of equally likely passwords. Each extra bit doubles the work an attacker must do.',
        },
        {
          resultLabel: 'Crack time',
          explanation:
            'An expected time at a stated guess rate, assuming the password was randomly generated. Human patterns make the real search much smaller.',
        },
      ],
      workflowLinks: [
        { slug: 'binary-to-decimal-calculator', step: 'See what a bit pattern looks like in practice.' },
        { slug: 'url-encoder-decoder', step: 'Encode a password safely into a URL when testing.' },
        { slug: 'percentage-calculator', step: 'Work out how much a longer password increases the keyspace.' },
      ],
      faqs: [
        {
          q: 'What is a good entropy target?',
          a: 'NIST and common practice suggest aiming well above 60 bits for user-chosen passwords and 80 or more for high-value accounts. Randomly generated passwords of 16 characters or more comfortably exceed both.',
        },
        {
          q: 'Is length really more important than symbols?',
          a: 'Yes. Adding one character multiplies the keyspace by the pool size, while adding a symbol set enlarges the pool more modestly. A long passphrase of ordinary words beats a short string of substitutions.',
        },
        {
          q: 'Does this check whether my password has been breached?',
          a: 'No, and it cannot. It measures the size of the search space, not whether a specific password appears in a leaked list. Check your password against a breach service and never reuse one across sites.',
        },
        {
          q: 'Why do you assume a trillion guesses per second?',
          a: 'That is roughly the rate of a modern GPU rig against a fast, unsalted hash. Rate-limited online logins are far slower, while a poorly stored hash can be attacked faster. The number is a scenario, not a guarantee.',
        },
      ],
      related: ['url-encoder-decoder', 'binary-to-decimal-calculator', 'contrast-ratio-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'url-encoder',
    slug: 'url-encoder-decoder',
    name: 'URL Encoder / Decoder',
    shortDesc: 'Percent-encode text for a URL query or decode an encoded URL back into readable text.',
    tagline: 'Stop breaking links with spaces and ampersands.',
    category: 'tech',
    iconName: 'Link2',
    badge: 'Web',
    keywords: [
      'url encoder',
      'url decoder',
      'percent encoding',
      'encodeuricomponent',
      'url escape',
      'query string encoder',
      'decode url',
    ],
    kind: 'custom',
    componentId: 'UrlEncoderDecoder',
    content: {
      intro:
        'The URL Encoder and Decoder converts text to percent-encoded form and back. It uses encodeURIComponent, the correct choice for a query parameter value or path segment, and decodes + as a space the way form submissions do.',
      howItWorks:
        'Reserved and non-ASCII characters are replaced by a percent sign followed by their UTF-8 bytes in hexadecimal. A space becomes %20. Decoding reverses the process, but a lone or truncated % sequence is invalid and is reported rather than silently dropped.',
      example:
        'The text "search=hello world&page=1" encodes to "search%3Dhello%20world%26page%3D1", with the ampersand and equals sign escaped so they cannot be read as query separators. Decoding it returns the original string.',
      formulas: [
        {
          label: 'Encoding',
          expression: 'Unreserved characters stay; everything else becomes %XX per UTF-8 byte',
        },
        {
          label: 'Decoding',
          expression: '%XX → byte, then UTF-8 decode; + → space in form data',
        },
      ],
      sources: [
        {
          label: 'RFC 3986 — Uniform Resource Identifier (URI): Generic Syntax',
          expression: 'Percent-encoding and reserved characters',
          note: 'Defines which characters may appear literally and how percent-encoding works.',
        },
        {
          label: 'WHATWG URL Standard',
          expression: 'application/x-www-form-urlencoded serialisation',
          note: 'Explains why + represents a space in form-encoded data but not in a path.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Output',
          explanation:
            'The encoded or decoded string. Encoding a full URL rather than a single component will escape the separators and break it, so encode values one at a time.',
        },
      ],
      workflowLinks: [
        { slug: 'password-entropy-calculator', step: 'Check the strength of any credential before sharing a test link.' },
        { slug: 'binary-to-decimal-calculator', step: 'Read the hex byte values behind %XX escapes.' },
        { slug: 'download-time-calculator', step: 'Estimate transfer time for the file the link points to.' },
      ],
      faqs: [
        {
          q: 'Should I use encodeURI or encodeURIComponent?',
          a: 'Use encodeURIComponent for a parameter value or path segment, because it escapes reserved characters such as & and =. Use encodeURI only for a complete URL where you want to preserve its structure.',
        },
        {
          q: 'Why does a space sometimes become + and sometimes %20?',
          a: 'In application/x-www-form-urlencoded data, + means space. In a URI path, + is a literal plus and space must be %20. This tool encodes spaces as %20 and accepts + as a space when decoding.',
        },
        {
          q: 'What causes the invalid percent-encoding error?',
          a: 'A % not followed by two hex digits, or a sequence of bytes that is not valid UTF-8. Copying a URL that was truncated or double-encoded is the usual cause.',
        },
        {
          q: 'Is my text sent anywhere?',
          a: 'No. Encoding and decoding happen entirely in your browser. Nothing is uploaded or stored, which is why the tool is safe for internal URLs and test parameters.',
        },
      ],
      related: ['binary-to-decimal-calculator', 'password-entropy-calculator', 'download-time-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'hex-to-rgb',
    slug: 'hex-to-rgb-converter',
    name: 'Hex to RGB Converter',
    shortDesc: 'Convert a hex colour to RGB and HSL with a live preview.',
    tagline: 'The same colour in every notation you need.',
    category: 'tech',
    iconName: 'Palette',
    badge: 'Design',
    featured: true,
    keywords: [
      'hex to rgb',
      'rgb to hex',
      'color converter',
      'hex to hsl',
      'colour code converter',
      'css color converter',
    ],
    kind: 'custom',
    componentId: 'ColorConverter',
    content: {
      intro:
        'The Hex to RGB Converter translates a colour between hex, RGB, and HSL, with a live swatch so you can confirm the value looks right. It accepts three- and six-digit hex, with or without the leading hash, and rgb() notation.',
      howItWorks:
        'A six-digit hex code is three pairs of hexadecimal digits, one per channel. Each pair converts to 0–255. HSL is derived from those channels: hue from the largest channel, saturation from the spread between channels, and lightness from the midpoint of the largest and smallest.',
      example:
        'The colour #1a2b3c is rgb(26, 43, 60). Its hue is about 210°, saturation 40%, and lightness 17%. A three-digit code expands by duplication, so #f00 becomes #ff0000, or rgb(255, 0, 0).',
      formulas: [
        {
          label: 'Hex to decimal channel',
          expression: 'Channel = parseInt(pair, 16)',
        },
        {
          label: 'Lightness',
          expression: 'L = (max + min) / 2',
        },
        {
          label: 'Saturation',
          expression: 'S = (max − min) / (1 − |2L − 1|)',
        },
      ],
      sources: [
        {
          label: 'W3C — CSS Color Module Level 4',
          expression: 'Hex notation, rgb(), and hsl()',
          note: 'Defines the sRGB colour space and the syntax for each notation this tool supports.',
        },
        {
          label: 'IEC 61966-2-1 — sRGB colour space',
          expression: 'Standard RGB gamut for displays',
          note: 'sRGB is the default colour space assumed by CSS colours on the web.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'HEX',
          explanation:
            'The canonical six-digit form. Three-digit shorthand is expanded by duplicating each digit.',
        },
        {
          resultLabel: 'HSL',
          explanation:
            'Hue is the colour angle in degrees, saturation and lightness are percentages. HSL is easier to adjust by hand than RGB because the three levers are perceptual.',
        },
      ],
      workflowLinks: [
        { slug: 'contrast-ratio-calculator', step: 'Check the colour against WCAG contrast thresholds.' },
        { slug: 'aspect-ratio-calculator', step: 'Size the design asset the colour belongs to.' },
        { slug: 'pixels-per-inch-calculator', step: 'Check the display density it will be viewed on.' },
      ],
      faqs: [
        {
          q: 'How do I convert hex to RGB by hand?',
          a: 'Split the six digits into three pairs. Convert each pair from base 16, so FF is 255 and 1A is 26. The three results are the red, green, and blue channels in that order.',
        },
        {
          q: 'Why do my converted colours look slightly different?',
          a: 'Hex and RGB are the same values, so they cannot differ. HSL is a mathematical transformation that can shift slightly with rounding, and different colour profiles can display the same sRGB value differently.',
        },
        {
          q: 'Does this support alpha transparency?',
          a: 'It handles solid colours in hex, rgb(), and hsl(). Eight-digit hex and rgba() alpha values are not converted, because the result would need a fourth channel with no single agreed notation.',
        },
        {
          q: 'Is hex the same as RGB?',
          a: 'Yes, in different notation. #1a2b3c and rgb(26, 43, 60) describe identical sRGB channels; hex is simply the same three bytes written in base 16.',
        },
      ],
      related: ['contrast-ratio-calculator', 'aspect-ratio-calculator', 'pixels-per-inch-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'contrast-ratio',
    slug: 'contrast-ratio-calculator',
    name: 'Contrast Ratio Calculator',
    shortDesc: 'Check any text and background colour pair against WCAG AA and AAA contrast thresholds.',
    tagline: 'Is that text actually readable?',
    category: 'tech',
    iconName: 'Contrast',
    badge: 'Accessibility',
    featured: true,
    keywords: [
      'contrast ratio calculator',
      'wcag contrast checker',
      'color contrast checker',
      'accessibility contrast',
      'aa aaa contrast',
      'text contrast calculator',
    ],
    kind: 'custom',
    componentId: 'ContrastRatioCalculator',
    content: {
      intro:
        'The Contrast Ratio Calculator measures the luminance difference between text and background colours and checks the result against WCAG 2.1 thresholds for AA and AAA, at normal and large text sizes. The preview renders your actual colours so the number and the look agree.',
      howItWorks:
        'Each sRGB channel is linearised, then weighted by the eye\u2019s sensitivity to red, green, and blue to give relative luminance. The ratio is the lighter luminance plus 0.05 divided by the darker plus 0.05, which ranges from 1:1 to 21:1. The thresholds are 4.5:1 for AA body text and 7:1 for AAA.',
      example:
        'Black on white scores 21:1, the maximum possible. Red #ff0000 on white scores about 4:1, which fails AA for body text but passes the 3:1 large-text threshold. #111827 on white scores about 17.7:1 and passes everything comfortably.',
      formulas: [
        {
          label: 'Contrast ratio',
          expression: 'Ratio = (L₁ + 0.05) / (L₂ + 0.05)',
          note: 'L₁ is the lighter of the two relative luminances.',
        },
        {
          label: 'Relative luminance',
          expression: 'L = 0.2126R + 0.7152G + 0.0722B',
          note: 'Channels are linearised before weighting, not used as raw sRGB values.',
        },
      ],
      sources: [
        {
          label: 'W3C — WCAG 2.1 Success Criterion 1.4.3 Contrast (Minimum)',
          expression: '4.5:1 for normal text, 3:1 for large text',
          note: 'The AA requirement that most accessibility audits test first.',
        },
        {
          label: 'W3C — WCAG 2.1 Success Criterion 1.4.6 Contrast (Enhanced)',
          expression: '7:1 for normal text, 4.5:1 for large text',
          note: 'The AAA requirement, often adopted for public-sector and health content.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Contrast ratio',
          explanation:
            'A ratio from 1:1 (identical colours) to 21:1 (black on white). Higher is more legible, and the threshold depends on text size and weight.',
        },
        {
          resultLabel: 'Pass or fail rows',
          explanation:
            'Each row applies one WCAG threshold. Large text means at least 24 px regular or 18.66 px bold, which is why the same pair can pass one row and fail another.',
        },
      ],
      workflowLinks: [
        { slug: 'hex-to-rgb-converter', step: 'Adjust the exact channel values behind the colour.' },
        { slug: 'aspect-ratio-calculator', step: 'Size the component the text sits in.' },
        { slug: 'pixels-per-inch-calculator', step: 'Check whether the text is physically large enough.' },
      ],
      faqs: [
        {
          q: 'What contrast ratio do I need?',
          a: 'WCAG AA requires 4.5:1 for normal text and 3:1 for large text. AAA raises that to 7:1 and 4.5:1. Aim for 4.5:1 as a baseline, and 7:1 where readability is critical.',
        },
        {
          q: 'What counts as large text?',
          a: 'At least 18 point (24 px) regular weight, or 14 point (about 18.66 px) bold. Below that, the stricter normal-text threshold applies even if the text looks prominent.',
        },
        {
          q: 'Why does black on white give 21:1 and not infinity?',
          a: 'The formula adds 0.05 to each luminance to avoid dividing by zero and to model ambient light. The maximum possible ratio is therefore (1 + 0.05) / (0 + 0.05) = 21.',
        },
        {
          q: 'Does passing WCAG mean the design is accessible?',
          a: 'No. Contrast is one requirement among many. Font size, spacing, focus indicators, alternative text, motion, and semantic markup all matter, and automated checks catch only part of the picture.',
        },
      ],
      related: ['hex-to-rgb-converter', 'aspect-ratio-calculator', 'pixels-per-inch-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.85 },
  },
  {
    id: 'css-clamp',
    slug: 'css-clamp-calculator',
    name: 'CSS Clamp Calculator',
    shortDesc: 'Turn a min and max font size across two viewport widths into a fluid clamp() slope and intercept.',
    tagline: 'Fluid type without guessing the middle value.',
    category: 'tech',
    iconName: 'Code',
    badge: 'CSS',
    featured: false,
    keywords: [
      'css clamp calculator',
      'fluid typography calculator',
      'clamp font size calculator',
      'css clamp formula',
      'responsive font size calculator',
      'vw to clamp calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'minSize', label: 'Minimum size', type: 'number', defaultValue: 16, min: 1, suffix: 'px' },
        { id: 'maxSize', label: 'Maximum size', type: 'number', defaultValue: 24, min: 1, suffix: 'px' },
        { id: 'minViewport', label: 'Viewport at minimum', type: 'number', defaultValue: 320, min: 1, suffix: 'px' },
        { id: 'maxViewport', label: 'Viewport at maximum', type: 'number', defaultValue: 1200, min: 1, suffix: 'px' },
        { id: 'currentViewport', label: 'Preview viewport', type: 'number', defaultValue: 768, min: 1, suffix: 'px' },
      ],
      results: [
        {
          label: 'Size at preview viewport',
          formulaCode:
            'Math.min(maxSize, Math.max(minSize, minSize + (maxSize - minSize) * (currentViewport - minViewport) / ((maxViewport - minViewport) || 1)))',
          suffix: 'px',
          accent: true,
        },
        {
          label: 'Fluid slope',
          formulaCode: '(maxSize - minSize) / ((maxViewport - minViewport) || 1) * 100',
          suffix: 'vw',
        },
        {
          label: 'Preferred intercept',
          formulaCode: 'minSize - (maxSize - minSize) / ((maxViewport - minViewport) || 1) * minViewport',
          suffix: 'px',
        },
        { label: 'Growth across range', formulaCode: 'maxSize - minSize', suffix: 'px' },
      ],
      formulaDescription:
        'Slope (vw) = (max size - min size) / (max viewport - min viewport) x 100; intercept = min size - slope x min viewport / 100.',
      tips: [
        'The preferred value is intercept plus slope, for example clamp(1rem, 0.818rem + 0.909vw, 1.5rem) for 16 px to 24 px between 320 px and 1200 px.',
        'Keep the minimum and maximum in rem so the text still responds to the user browser font size. A clamp in pure px defeats the zoom and text-size settings.',
        'Test at 200 percent zoom and at a narrow viewport. Fluid type can still overflow if a long word or a fixed-width container does not wrap.',
      ],
    },
    content: {
      intro:
        'The CSS Clamp Calculator converts a minimum and maximum size at two viewport widths into the slope and intercept of a fluid clamp() expression. It also previews the rendered size at a chosen viewport, so you can check the middle of the range instead of only the endpoints.',
      howItWorks:
        'The size difference is divided by the viewport difference to get the growth per pixel, then multiplied by 100 to express the slope in viewport width units. The intercept is the minimum size minus the slope applied at the minimum viewport. The preferred value inside clamp() is the intercept plus the slope, and the browser clamps it between the minimum and maximum. The preview applies the same linear interpolation and clamps the result.',
      example:
        'For 16 px at 320 px and 24 px at 1200 px, the slope is 8 / 880 x 100 = 0.909vw. The intercept is 16 - 0.00909 x 320 = 13.09 px, or 0.818rem. At a 768 px viewport the size is 16 + 8 x 448 / 880 = 20.07 px. The CSS is clamp(1rem, 0.818rem + 0.909vw, 1.5rem).',
      formulas: [
        { label: 'Slope', expression: '(max size - min size) / (max viewport - min viewport) x 100' },
        { label: 'Intercept', expression: 'min size - slope x min viewport / 100' },
        { label: 'Preferred value', expression: 'intercept + slope' },
        { label: 'Rendered size', expression: 'clamp(min size, preferred, max size)' },
      ],
      sources: [
        {
          label: 'MDN Web Docs - clamp()',
          expression: 'CSS clamp function syntax and behaviour',
          note: 'Defines clamp as a minimum, preferred, and maximum value with comparison rules.',
        },
        {
          label: 'W3C WCAG 2.2 - Success Criterion 1.4.4 Resize Text',
          expression: 'Text resize to 200 percent without loss of content',
          note: 'The accessibility reason to keep type relative and test at zoom.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Size at preview viewport',
          explanation:
            'The interpolated size after clamping. It should match what the browser renders at that width if no other rule overrides it.',
        },
        {
          resultLabel: 'Fluid slope',
          explanation:
            'The viewport-width coefficient. A larger slope makes the size change faster across the range and can feel jumpy on small screens.',
        },
        {
          resultLabel: 'Preferred intercept',
          explanation:
            'The fixed part of the preferred value in pixels. Convert it to rem by dividing by the root font size before writing the CSS.',
        },
      ],
      workflowLinks: [
        { slug: 'rem-to-px-calculator', step: 'Convert the intercept and endpoints into rem for the final CSS.' },
        { slug: 'pixels-per-inch-calculator', step: 'Check physical size on a display when visual size matters.' },
        { slug: 'aspect-ratio-calculator', step: 'Keep media and containers proportional while type scales.' },
      ],
      faqs: [
        {
          q: 'What does clamp() do in CSS?',
          a: 'clamp(min, preferred, max) returns the preferred value, but never less than the minimum or more than the maximum. It is commonly used for fluid type: the preferred value scales with the viewport, while the min and max stop it from becoming unreadably small or absurdly large.',
        },
        {
          q: 'How do I convert the intercept from px to rem?',
          a: 'Divide by the root font size, normally 16 px. An intercept of 13.09 px is 0.818rem. Keep the min and max in rem as well so the whole expression respects the user font size setting, and use the rem-to-px calculator to check the values.',
        },
        {
          q: 'Why is my clamp() not changing with the viewport?',
          a: 'The preferred value may be outside the min or max for that width, or a more specific rule may be overriding it. Check the computed style in devtools. Also confirm the slope uses vw units and that the container is not constraining the layout in a way that makes the viewport irrelevant.',
        },
        {
          q: 'Should I use vw or a container query unit?',
          a: 'Viewport units are simple and widely supported, but they scale with the browser window rather than the component. If the same card appears in a narrow sidebar and a wide main column, container query units can be more appropriate. The arithmetic for the slope is the same, with the container width in place of the viewport.',
        },
        {
          q: 'Is fluid type bad for accessibility?',
          a: 'Not if it is done with relative units and tested at zoom. The risk is a clamp with pure px values that ignores the user font size, or a maximum so large that text overflows. Keep body text at least 16 px, allow reflow, and test at 200 percent zoom.',
        },
      ],
      related: ['rem-to-px-calculator', 'pixels-per-inch-calculator', 'aspect-ratio-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.8 },
  },
  {
    id: 'rem-to-px',
    slug: 'rem-to-px-calculator',
    name: 'REM to PX Calculator',
    shortDesc: 'Convert rem to pixels and pixels to rem at any root font size, with the root percentage shown.',
    tagline: 'Know what 1.5rem really renders at.',
    category: 'tech',
    iconName: 'Monitor',
    badge: 'CSS',
    featured: false,
    keywords: [
      'rem to px calculator',
      'px to rem calculator',
      'rem to pixels',
      'css rem converter',
      'root font size calculator',
      'rem conversion',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'remValue', label: 'REM value', type: 'number', defaultValue: 1.5, min: 0, step: 0.125, suffix: 'rem' },
        { id: 'rootFontSize', label: 'Root font size', type: 'number', defaultValue: 16, min: 1, suffix: 'px' },
        { id: 'pixelValue', label: 'Pixel value to convert', type: 'number', defaultValue: 24, min: 0, suffix: 'px' },
      ],
      results: [
        {
          label: 'REM in pixels',
          formulaCode: 'remValue * rootFontSize',
          suffix: 'px',
          accent: true,
        },
        {
          label: 'Pixels in REM',
          formulaCode: 'pixelValue / rootFontSize',
          suffix: 'rem',
        },
        {
          label: 'Root size as percentage of 16px',
          formulaCode: 'rootFontSize / 16 * 100',
          suffix: '%',
        },
      ],
      formulaDescription: 'Pixels = rem x root font size; rem = pixels / root font size.',
      tips: [
        'The browser default root font size is usually 16 px, but the user can change it. Do not assume 16 px in production calculations.',
        'Setting html font-size to a fixed px value overrides the user preference. A percentage or a rem-based scale preserves it.',
        'Use rem for type and spacing that should follow the user setting, and px for borders or hairlines that should stay crisp.',
      ],
    },
    content: {
      intro:
        'The REM to PX Calculator converts a rem value into pixels and a pixel value back into rem at a chosen root font size. It is a quick check for design handoff, CSS review, and accessibility testing when the root size is not the browser default.',
      howItWorks:
        'One rem equals the root element font size. Multiplying a rem value by the root size in pixels gives the rendered pixels. Dividing a pixel value by the root size gives the equivalent rem. The root percentage compares the chosen root size with the 16 px browser default, which is useful when a stylesheet sets html font-size as a percentage.',
      example:
        'At the default 16 px root, 1.5rem is 24 px, and 24 px is 1.5rem. The root size is 100 percent of the 16 px default. If the root is set to 18 px, 1.5rem becomes 27 px and 24 px becomes 1.333rem.',
      formulas: [
        { label: 'Pixels', expression: 'rem x root font size' },
        { label: 'REM', expression: 'pixels / root font size' },
        { label: 'Root percentage', expression: 'root font size / 16 x 100' },
      ],
      sources: [
        {
          label: 'MDN Web Docs - rem',
          expression: 'Root em CSS unit',
          note: 'Defines rem relative to the root element font size and explains the difference from em.',
        },
        {
          label: 'W3C WCAG 2.2 - Success Criterion 1.4.4 Resize Text',
          expression: 'Text resize and relative units',
          note: 'Explains why text should scale with the user setting rather than a fixed pixel size.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'REM in pixels',
          explanation:
            'The rendered size at the root font size you entered. If the user changes their browser default, this value changes with it.',
        },
        {
          resultLabel: 'Pixels in REM',
          explanation:
            'The rem value that produces the pixel size. Useful when converting a pixel-based design token into a relative one.',
        },
        {
          resultLabel: 'Root size as percentage of 16px',
          explanation:
            'How the root compares with the browser default. A 62.5 percent root makes 1rem equal 10 px, which is convenient but can trip up users who rely on a larger default.',
        },
      ],
      workflowLinks: [
        { slug: 'css-clamp-calculator', step: 'Build a fluid type scale from the converted rem values.' },
        { slug: 'pixels-per-inch-calculator', step: 'Translate CSS pixels into physical size on a screen.' },
        { slug: 'contrast-ratio-calculator', step: 'Check the text colour against its background after resizing.' },
      ],
      faqs: [
        {
          q: 'Is 1rem always 16px?',
          a: 'Only when the root font size is the browser default of 16 px and no stylesheet overrides it. Users can set a larger default, and a site can change html font-size. The rem unit follows that root value, which is why it is better for accessibility than a fixed pixel.',
        },
        {
          q: 'What is the difference between rem and em?',
          a: 'rem is relative to the root element font size. em is relative to the font size of the element itself or its parent, so nested em values compound. Use rem for a predictable global scale and em for spacing that should scale with a component local font size.',
        },
        {
          q: 'Should I set html font-size to 62.5 percent?',
          a: 'It makes 1rem equal 10 px at the default, which simplifies mental arithmetic, but it also assumes the user has not changed the default. A root of 100 percent preserves the user setting and is usually safer. If you use 62.5 percent, test with a larger browser font size.',
        },
        {
          q: 'Why does my rem conversion differ from the design file?',
          a: 'The design tool may use a different root size, or it may treat its canvas as pixels rather than rem. Confirm the root used in the design system and convert from that. A 1.5rem token at a 16 px root is 24 px, but the same token at an 18 px root is 27 px.',
        },
        {
          q: 'Are rem units supported everywhere?',
          a: 'Yes in all current browsers. The practical issue is not support but consistency: a fixed root size, a CSS reset, or a component library can change the effective value. Inspect the computed root font size when a conversion looks wrong.',
        },
      ],
      related: ['css-clamp-calculator', 'pixels-per-inch-calculator', 'contrast-ratio-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.78 },
  },
  {
    id: 'video-file-size',
    slug: 'video-file-size-calculator',
    name: 'Video File Size Calculator',
    shortDesc: 'Estimate video file size from duration, video bitrate, and audio bitrate in MB, GB, and GiB.',
    tagline: 'Know the upload size before the export finishes.',
    category: 'tech',
    iconName: 'HardDrive',
    badge: 'Video',
    featured: false,
    keywords: [
      'video file size calculator',
      'video bitrate calculator',
      'how big is my video file',
      'export size calculator',
      'mbps to file size',
      'video storage calculator',
    ],
    kind: 'config',
    config: {
      fields: [
        { id: 'durationMin', label: 'Duration', type: 'number', defaultValue: 10, min: 0.1, step: 0.5, suffix: 'min' },
        { id: 'videoMbps', label: 'Video bitrate', type: 'number', defaultValue: 12, min: 0.1, step: 0.5, suffix: 'Mbps' },
        { id: 'audioKbps', label: 'Audio bitrate', type: 'number', defaultValue: 192, min: 0, step: 16, suffix: 'kbps' },
      ],
      results: [
        {
          label: 'Estimated file size',
          formulaCode: 'durationMin * 60 * (videoMbps * 1000000 + audioKbps * 1000) / 8 / 1000000',
          suffix: 'MB',
          accent: true,
        },
        {
          label: 'Estimated size in GB',
          formulaCode: 'durationMin * 60 * (videoMbps * 1000000 + audioKbps * 1000) / 8 / 1000000000',
          suffix: 'GB',
        },
        {
          label: 'Size per minute',
          formulaCode: '60 * (videoMbps * 1000000 + audioKbps * 1000) / 8 / 1000000',
          suffix: 'MB/min',
        },
        {
          label: 'Estimated size in GiB',
          formulaCode: 'durationMin * 60 * (videoMbps * 1000000 + audioKbps * 1000) / 8 / 1073741824',
          suffix: 'GiB',
        },
      ],
      formulaDescription:
        'Bytes = seconds x (video Mbps x 1,000,000 + audio kbps x 1,000) / 8; MB = bytes / 1,000,000.',
      tips: [
        'Bitrate is per second, so a 10 minute clip at 12 Mbps is 7,200 megabits before audio, not 12 megabits in total.',
        'Variable bitrate means the real file can be smaller or larger than this estimate. Container overhead, subtitles, and multiple audio tracks add a little more.',
        'MB and GB here are decimal, as drive makers use them. GiB is the binary unit some operating systems show, which is why a 1 GB file can display as 0.93 GB.',
      ],
    },
    content: {
      intro:
        'The Video File Size Calculator estimates how large a video export will be from its duration, video bitrate, and audio bitrate. It reports decimal MB and GB for upload limits and binary GiB for the size some operating systems display.',
      howItWorks:
        'Video and audio bitrates are converted to bits per second, added, and multiplied by the duration in seconds to get total bits. Dividing by 8 converts to bytes, and dividing by one million or one billion gives decimal megabytes or gigabytes. The GiB result divides by 1,073,741,824, the binary definition. Size per minute applies the same calculation to 60 seconds.',
      example:
        'A 10 minute clip at 12 Mbps video and 192 kbps audio uses 12,192,000 bits per second. Over 600 seconds that is 7,315,200,000 bits, or 914,400,000 bytes. That is about 914 MB, 0.914 GB, or 0.852 GiB, and about 91 MB per minute.',
      formulas: [
        { label: 'Total bits', expression: 'seconds x (video bps + audio bps)' },
        { label: 'Bytes', expression: 'total bits / 8' },
        { label: 'Decimal MB', expression: 'bytes / 1,000,000' },
        { label: 'Binary GiB', expression: 'bytes / 1,073,741,824' },
      ],
      sources: [
        {
          label: 'YouTube Help - Recommended upload encoding settings',
          expression: 'Bitrate and resolution guidance',
          note: 'Platform guidance on bitrates for common resolutions and frame rates.',
        },
        {
          label: 'Apple Support - About storage capacity',
          expression: 'Decimal versus binary storage units',
          note: 'Explains why a drive quoted in decimal GB shows less in a binary GiB display.',
        },
      ],
      resultExplanations: [
        {
          resultLabel: 'Estimated file size',
          explanation:
            'A constant-bitrate estimate in decimal megabytes. Variable bitrate and container overhead can move the real file by several percent.',
        },
        {
          resultLabel: 'Estimated size in GB',
          explanation:
            'The same estimate in decimal gigabytes, the unit used by upload forms and drive marketing. Compare it with the platform limit before exporting.',
        },
        {
          resultLabel: 'Estimated size in GiB',
          explanation:
            'The binary unit reported by some file managers. It is numerically smaller than the decimal GB figure for the same file.',
        },
      ],
      workflowLinks: [
        { slug: 'download-time-calculator', step: 'Estimate how long the file takes to upload or download.' },
        { slug: 'data-storage-converter', step: 'Convert between decimal and binary storage units.' },
        { slug: 'aspect-ratio-calculator', step: 'Choose the frame shape before fixing the bitrate.' },
      ],
      faqs: [
        {
          q: 'Why is the estimated size different from the exported file?',
          a: 'Most encoders use variable bitrate, so the actual data rate changes with scene complexity. Container overhead, chapter markers, subtitles, and a second audio track also add bytes. Treat the estimate as a planning figure and check the real file before uploading.',
        },
        {
          q: 'Does a higher bitrate always mean better quality?',
          a: 'Up to a point. Beyond the level the codec and source can use, extra bitrate adds file size without visible improvement. Resolution, frame rate, codec efficiency, and the quality of the source matter as much as the number.',
        },
        {
          q: 'What is the difference between MB and MiB?',
          a: 'MB is decimal, one million bytes. MiB is binary, 1,048,576 bytes. The same file is a smaller number in MiB, which is why a 1 GB drive appears as about 0.93 GiB in some operating systems. This calculator shows both so the units are not confused.',
        },
        {
          q: 'How do I hit an upload limit?',
          a: 'Calculate the allowed bitrate by rearranging the formula: total bits per second = target bytes x 8 / seconds. Subtract the audio bitrate, then set the video bitrate below that. Leave a margin for container overhead, because the limit applies to the whole file.',
        },
        {
          q: 'Does audio bitrate matter for file size?',
          a: 'It is small compared with video but not zero. At 192 kbps, a 10 minute clip adds about 14.4 MB. For a long recording or a high video bitrate the audio share shrinks, but it still counts against a tight upload limit.',
        },
      ],
      related: ['download-time-calculator', 'data-storage-converter', 'aspect-ratio-calculator'],
    },
    seo: { status: 'index', reviewStatus: 'reviewed', priority: 0.82 },
  },
];
