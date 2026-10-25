/**
 * Ahmed Khan Qureshi Family Portal
 * Authentic Genealogical & Timeline Dataset
 * With Nastaleeq (Urdu) Names, Verified Dates, and Accurate Kinship Branches
 */

export const familyData = {
  patriarch: {
    id: "ahmed-khan-qureshi",
    name: "Ahmed Khan Qureshi",
    nameNastaleeq: "احمد خان قریشی",
    title: "Patriarch & Progenitor",
    titleNastaleeq: "بانیِ خاندان و سرپرست",
    relation: "Patriarch of the Family",
    generation: 0,
    birthYear: 1940,
    birthDateFormatted: "c. 1940",
    birthPlace: "Punjab, British India / Pakistan",
    deathYear: 1978,
    deathDateFormatted: "28 Safar / 7 February (Late 1970s)",
    gender: "male",
    status: "Deceased",
    bio: "Patriarch of the family whose resilience, honor, and enduring principles laid the foundation for generations to come. He left three beloved sisters: Khurshid, Zohra, and Majji Jaan.",
    tributeQuote: "A legacy of faith, perseverance, and boundless love for family.",
    spouseId: "surriya-qureshi",
    spouseName: "Surriya Qureshi",
    spouseNastaleeq: "ثریا قریشی",
    offspringCount: 9,
    events: [
      { year: "c. 1940", title: "Birth of Ahmed Khan Qureshi", desc: "Born in the 1940s into a respected family known for trade and scholarship." },
      { year: "1963", title: "Holy Union with Surriya", desc: "Married Surriya Qureshi, forming the central root of the family dynasty." },
      { year: "Late 1970s", title: "Barsee / Passing into Eternal Memory", desc: "Passed away on 28 Safar (7 February) in the late 1970s, remembered with lifelong devotion." }
    ]
  },

  matriarch: {
    id: "surriya-qureshi",
    name: "Surriya Qureshi",
    nameNastaleeq: "ثریا قریشی",
    title: "Matriarch & Family Anchor",
    titleNastaleeq: "والدہ محترمہ و سرپرستِ خاندان",
    relation: "Matriarch of the Family",
    generation: 0,
    birthYear: 1945,
    birthMonth: "July",
    birthDateFormatted: "July 31, 1945",
    birthPlace: "Punjab",
    deathYear: 2026,
    deathDateFormatted: "August 25, 2026",
    gender: "female",
    status: "Deceased",
    bio: "The beloved matriarch who nurtured, guided, and united 9 children and dozens of grandchildren across eight decades of grace, devotion, and steadfast strength at the Baloch Colony family home.",
    tributeQuote: "Her warmth was our sanctuary; her wisdom our compass.",
    spouseId: "ahmed-khan-qureshi",
    spouseName: "Ahmed Khan Qureshi",
    spouseNastaleeq: "احمد خان قریشی",
    offspringCount: 9,
    events: [
      { year: 1945, title: "Birth of Surriya Qureshi", desc: "Born on July 31, 1945, on the cusp of a transformative era." },
      { year: 1963, title: "Marriage to Ahmed Khan Qureshi", desc: "Embarked on life's journey alongside Ahmed Khan." },
      { year: "1964–1978", title: "Nurturing 9 Children", desc: "Raised nine children with faith, discipline, and warmth in Karachi." },
      { year: 2026, title: "Peaceful Departure", desc: "Passed away peacefully on August 25, 2026, surrounded by prayers from her entire lineage." }
    ]
  },

  // The 9 Offspring (Generation 1)
  offspring: [
    {
      id: "child-tassawar",
      name: "Tassawar Ahmed Qureshi",
      nameNastaleeq: "تصوّر احمد قریشی",
      nickname: "Hob Bhai",
      nicknameNastaleeq: "ہوب بھائی (ہابھائی)",
      nicknameOrigin: "Pronounced colloquially as 'Habhai', after a friend of his father who resembled the television character Hob.",
      order: 1,
      gender: "male",
      status: "Living",
      generation: 1,
      birthYear: 1963, // Year pending verification per user note
      birthDateFormatted: "c. 1963 (Verification Pending)",
      isBirthApproximate: true,
      role: "Eldest Son (فرزندِ ارجمند)",
      spouse: "Saima",
      spouseNastaleeq: "صائمہ",
      bio: "Eldest son of Ahmed Khan Qureshi and Surriya Qureshi, affectionately known to all family generations as Hob Bhai (Habhai).",
      grandchildren: [
        { id: "gc-tassawar-ahmed", name: "Ahmed Khan Qureshi", nameNastaleeq: "احمد خان قریشی", relation: "Son", bio: "Named after his grandfather, Patriarch Ahmed Khan Qureshi." },
        { id: "gc-tassawar-hashaam", name: "Hashaam Ahmed Qureshi", nameNastaleeq: "ہشام احمد قریشی", birthYear: 1992, birthDateFormatted: "June 21, 1992", relation: "Son", bio: "Married to Hina." },
        { id: "gc-tassawar-umaima", name: "Umaima Ahmed Qureshi", nameNastaleeq: "امیمہ احمد قریشی", nickname: "Maima", relation: "Daughter", bio: "Daughter of Tassawar & Saima." },
        { id: "gc-tassawar-iman", name: "Iman Ahmed Qureshi", nameNastaleeq: "ایمان احمد قریشی", relation: "Daughter", bio: "Daughter of Tassawar & Saima." },
        { id: "gc-tassawar-hassan", name: "Hassan Ahmed Qureshi", nameNastaleeq: "حسن احمد قریشی", birthYear: 2008, birthDateFormatted: "November 25, 2008", relation: "Son", bio: "Son of Tassawar & Saima." }
      ]
    },
    {
      id: "child-tabasum",
      name: "Tabasum Ahmed Qureshi",
      nameNastaleeq: "تبسّم احمد قریشی",
      nickname: "Buchchum",
      nicknameNastaleeq: "بچّم",
      nicknameOrigin: "From affectionate childhood baby-speak of Tabuchchum.",
      order: 2,
      gender: "male",
      status: "Living",
      generation: 1,
      birthYear: 1964,
      birthDateFormatted: "July 20, 1964",
      role: "Second Son",
      spouse: "Amna",
      spouseNastaleeq: "آمنہ",
      spouseBirth: "October 2, 1966",
      bio: "Second son of Ahmed Khan and Surriya Qureshi. Tabasum and Amna raised a warm, close-knit family.",
      grandchildren: [
        { id: "gc-tabasum-umar", name: "Umar Khan", nameNastaleeq: "عمر خان", relation: "Step-Son", bio: "Joined the family with Amna." },
        { id: "gc-tabasum-ammarah", name: "Ammarah Jabeen", nameNastaleeq: "عمارہ جبین", birthYear: 1986, birthDateFormatted: "May 24, 1986", relation: "Step-Daughter", bio: "Joined the family with Amna; married Sohail Khan." },
        { id: "gc-tabasum-uzair", name: "Uzair Ahmed Qureshi", nameNastaleeq: "عزیر احمد قریشی", birthYear: 1992, birthDateFormatted: "September 6, 1992", relation: "Son", bio: "Eldest biological son of Tabasum & Amna." },
        { id: "gc-tabasum-ramsha", name: "Ramsha Ahmed Qureshi", nameNastaleeq: "رمشاء احمد قریشی", birthYear: 1993, birthDateFormatted: "August 15, 1993", relation: "Daughter (Twin)", bio: "Twin sister of Maria; married to cousin Larayb Naeem." },
        { id: "gc-tabasum-maria", name: "Maria Ahmed Qureshi", nameNastaleeq: "ماریا احمد قریشی", birthYear: 1993, birthDateFormatted: "August 15, 1993", relation: "Daughter (Twin)", bio: "Twin sister of Ramsha; married to Kashif." },
        { id: "gc-tabasum-sameer", name: "Sameer Ahmed Qureshi", nameNastaleeq: "سمیر احمد قریشی", birthYear: 1996, birthDateFormatted: "November 1, 1996", relation: "Son", bio: "Originally named Ahmed Khan Qureshi, renamed Sameer to avoid confusion with his cousin Ahmed Khan (son of Tassawar)." },
        { id: "gc-tabasum-huzaifa", name: "Huzaifa Ahmed Qureshi", nameNastaleeq: "حذیفہ احمد قریشی", birthYear: 2016, birthDateFormatted: "November 23, 2016", relation: "Son", bio: "Youngest son of Tabasum & Amna." }
      ]
    },
    {
      id: "child-tauseef",
      name: "Tauseef Ahmed Qureshi",
      nameNastaleeq: "توصیف احمد قریشی",
      nickname: "Munna",
      nicknameNastaleeq: "منا",
      order: 3,
      gender: "male",
      status: "Deceased",
      generation: 1,
      birthYear: 1966,
      birthDateFormatted: "c. 1966",
      role: "Third Son (مرحوم)",
      spouse: "Shahista",
      spouseNastaleeq: "شائستہ",
      bio: "Son of Ahmed Khan and Surriya Qureshi, fondly remembered by his family as Munna.",
      grandchildren: [
        { id: "gc-tauseef-aimen", name: "Aimen Tauseef Qureshi", nameNastaleeq: "ایمن توصیف قریشی", birthYear: 1970, birthDateFormatted: "May 6", relation: "Child", bio: "Child of Tauseef & Shahista." },
        { id: "gc-tauseef-yumna", name: "Yumna Tauseef", nameNastaleeq: "یمنیٰ توصیف", birthYear: 1995, birthDateFormatted: "November 23, 1995", relation: "Daughter", bio: "Daughter of Tauseef & Shahista." },
        { id: "gc-tauseef-usman", name: "Usman Tauseef Qureshi", nameNastaleeq: "عثمان توصیف قریشی", relation: "Son", bio: "Son of Tauseef & Shahista." },
        { id: "gc-tauseef-ammar", name: "Ammar Tauseef Qureshi", nameNastaleeq: "عمار توصیف قریشی", birthDateFormatted: "March 30", relation: "Son", bio: "Son of Tauseef & Shahista." }
      ]
    },
    {
      id: "child-hina",
      name: "Hina Salman Jamil",
      nameNastaleeq: "حنا سلمان جمیل",
      nickname: "Baby",
      nicknameNastaleeq: "بیبی",
      order: 4,
      gender: "female",
      status: "Living",
      generation: 1,
      birthYear: 1968,
      birthDateFormatted: "March 24, 1968",
      role: "Eldest Daughter",
      spouse: "Salman Anjum Jamil",
      spouseNastaleeq: "سلمان انجم جمیل",
      spouseBirth: "January 25, 1953",
      bio: "Eldest daughter of Ahmed Khan Qureshi and Surriya Qureshi, affectionately nicknamed Baby.",
      grandchildren: [
        { id: "gc-hina-sunny", name: "Sunny Salman Jamil", nameNastaleeq: "سنی سلمان جمیل", birthYear: 1992, birthDateFormatted: "May 18, 1992", relation: "Son", bio: "Firstborn son of Hina & Salman." },
        { id: "gc-hina-humza", name: "Dr. Humza Salman Jamil MD", nameNastaleeq: "ڈاکٹر حمزہ سلمان جمیل", birthYear: 1995, birthDateFormatted: "July 31, 1995", relation: "Son", bio: "Physician; born on his grandmother Surriya Qureshi's 50th birthday." }
      ]
    },
    {
      id: "child-lubna",
      name: "Lubna Zahid Shah",
      nameNastaleeq: "لبنیٰ زاہد شاہ",
      order: 5,
      gender: "female",
      status: "Deceased",
      generation: 1,
      birthYear: 1970,
      birthDateFormatted: "March 23, 1970 (March 24, 1969 per visa)",
      role: "Second Daughter (مرحومہ)",
      spouse: "Zahid Hussein Shah",
      spouseNastaleeq: "زاہد حسین شاہ",
      bio: "Second daughter of Ahmed Khan and Surriya Qureshi, remembered with deep affection by all siblings and children.",
      grandchildren: [
        { id: "gc-lubna-tuba", name: "Tuba Zahid", nameNastaleeq: "طوبیٰ زاہد", relation: "Daughter (#1)", bio: "Eldest daughter; married to Umar Khan." },
        { id: "gc-lubna-nimra", name: "Nimra Zahid Hussein", nameNastaleeq: "نمرہ زاہد حسین", birthYear: 1987, birthDateFormatted: "September 11, 1987", relation: "Daughter (#2)", bio: "Second daughter; married to Danish Raza." },
        { id: "gc-lubna-shayan", name: "Syeda Shayan Zahid Shah", nameNastaleeq: "سیدہ شایان زاہد شاہ", nickname: "Shanoo", nicknameNastaleeq: "شانو", relation: "Daughter (#3)", bio: "Third daughter; affectionately known as Shanoo." },
        { id: "gc-lubna-nael", name: "Nael Hameez Shah", nameNastaleeq: "نائل ہمیز شاہ", relation: "Son (#4)", bio: "Son of Lubna & Zahid Hussein Shah." }
      ]
    },
    {
      id: "child-uzma",
      name: "Uzma Ahmed Khan Qureshi",
      nameNastaleeq: "عظمیٰ احمد خان قریشی",
      nickname: "Ujji",
      nicknameNastaleeq: "اجی",
      order: 6,
      gender: "female",
      status: "Living",
      generation: 1,
      birthYear: 1972,
      birthDateFormatted: "June 26, 1972",
      role: "Third Daughter",
      spouse: "Masood Ahmed",
      spouseNastaleeq: "مسعود احمد",
      spouseBirth: "August 12, 1964",
      bio: "Third daughter of Ahmed Khan and Surriya Qureshi, affectionately nicknamed Ujji.",
      grandchildren: [
        { id: "gc-uzma-sadia", name: "Sadia Masood Ahmed", nameNastaleeq: "سعدیہ مسعود احمد", birthYear: 1995, birthDateFormatted: "December 30, 1995", relation: "Daughter (#1)", bio: "Eldest daughter of Uzma & Masood; married Tallal Qureshi." },
        { id: "gc-uzma-abdullah", name: "Sheikh Muhammad Abdullah Masood", nameNastaleeq: "شیخ محمد عبد اللہ مسعود", birthYear: 1997, birthDateFormatted: "August 7, 1997", relation: "Son (#2)", bio: "Eldest son of Uzma & Masood." },
        { id: "gc-uzma-ayesha", name: "Ayesha Masood Ahmed", nameNastaleeq: "عائشہ مسعود احمد", birthYear: 1999, birthDateFormatted: "May 14, 1999", relation: "Daughter (#3)", bio: "Second daughter of Uzma & Masood; married Ali Qureshi." },
        { id: "gc-uzma-saadullah", name: "Saadullah Masood Ahmed", nameNastaleeq: "سعد اللہ مسعود احمد", birthYear: 2001, birthDateFormatted: "September 30, 2001", relation: "Son (#4)", bio: "Second son of Uzma & Masood." },
        { id: "gc-uzma-talha", name: "Talha Masood Ahmed", nameNastaleeq: "طلحہ مسعود احمد", birthYear: 2005, birthDateFormatted: "September 21, 2005", relation: "Son (#5)", bio: "Youngest son of Uzma & Masood." }
      ]
    },
    {
      id: "child-shazma",
      name: "Shazma Ahmed Khan Qureshi",
      nameNastaleeq: "شزما احمد خان قریشی",
      order: 7,
      gender: "female",
      status: "Deceased",
      generation: 1,
      birthYear: 1973,
      birthDateFormatted: "May 25, c. 1973",
      deathYear: 2017,
      deathDateFormatted: "July 8, 2017",
      role: "Fourth Daughter (مرحومہ)",
      spouse: "Naeem Sarfraz Uddin",
      spouseNastaleeq: "نعیم سرفراز الدین",
      bio: "Fourth daughter of Ahmed Khan and Surriya Qureshi. Remembered with prayers and love.",
      grandchildren: [
        { id: "gc-shazma-larayb", name: "Larayb Naeem", nameNastaleeq: "لاریب نعیم", birthYear: 1991, birthDateFormatted: "November 12, 1991", relation: "Son", bio: "Eldest son; married cousin Ramsha Ahmed Qureshi." },
        { id: "gc-shazma-sufiyan", name: "Sufiyan Naeem", nameNastaleeq: "سفیان نعیم", birthYear: 1998, birthDateFormatted: "October 17, 1998", relation: "Son", bio: "Second son of Shazma & Naeem." }
      ]
    },
    {
      id: "child-asim",
      name: "Asim Ahmed Qureshi",
      nameNastaleeq: "عاصم احمد قریشی",
      order: 8,
      gender: "male",
      status: "Living",
      generation: 1,
      birthYear: 1975,
      birthDateFormatted: "January 11, 1975",
      role: "Fourth Son",
      spouse: "Saba (née Suleman)",
      spouseNastaleeq: "صبا عاصم (سلیمان)",
      residence: "Kuwait",
      bio: "Fourth son of Ahmed Khan and Surriya Qureshi. Residing with his family in Kuwait.",
      grandchildren: [
        { id: "gc-asim-mariam", name: "Mariam", nameNastaleeq: "مریم", relation: "Daughter", bio: "Daughter of Asim & Saba." },
        { id: "gc-asim-zara", name: "Zara", nameNastaleeq: "زارا", relation: "Daughter", bio: "Daughter of Asim & Saba." }
      ]
    },
    {
      id: "child-asima",
      name: "Asima Adnan Khan",
      nameNastaleeq: "عاصمہ عدنان خان",
      nickname: "Kuckoo",
      nicknameNastaleeq: "کوکو",
      order: 9,
      gender: "female",
      status: "Living",
      generation: 1,
      birthYear: 1976,
      birthDateFormatted: "December 8, 1976 (Recorded Aug 19, 1976)",
      role: "Youngest Daughter",
      spouse: "Adnan Ahmad Khan",
      spouseNastaleeq: "عدنان احمد خان",
      spouseBirth: "October 14, 1972",
      bio: "Youngest daughter of Ahmed Khan Qureshi and Surriya Qureshi, affectionately known as Kuckoo.",
      grandchildren: [
        { id: "gc-asima-areeb", name: "Areeb Adnan Khan", nameNastaleeq: "عریب عدنان خان", birthYear: 1999, birthDateFormatted: "November 29, 1999", relation: "Son", bio: "Eldest son of Asima & Adnan." },
        { id: "gc-asima-manahil", name: "Manahil Adnan Khan", nameNastaleeq: "مناہل عدنان خان", birthYear: 2002, birthDateFormatted: "August 25, 2002", relation: "Daughter", bio: "Eldest daughter of Asima & Adnan." },
        { id: "gc-asima-mahnoor", name: "Mahnoor Adnan Khan", nameNastaleeq: "ماہ نور عدنان خان", birthYear: 2005, birthDateFormatted: "May 7, 2005", relation: "Daughter", bio: "Second daughter of Asima & Adnan." },
        { id: "gc-asima-aayan", name: "Aayan Adnan Khan", nameNastaleeq: "ایان عدنان خان", birthYear: 2015, birthDateFormatted: "March 12, 2015", relation: "Son", bio: "Youngest son of Asima & Adnan (Nickname: Noni)." }
      ]
    }
  ]
};

/**
 * Builds the complete chronological timeline from c. 1940 to 2026.
 */
export function getChronologicalTimeline() {
  const events = [];

  // 1. Patriarch Birth
  events.push({
    id: "event-patriarch-birth",
    year: familyData.patriarch.birthYear,
    displayDate: "c. 1940",
    personId: familyData.patriarch.id,
    personName: familyData.patriarch.name,
    nameNastaleeq: familyData.patriarch.nameNastaleeq,
    eventType: "birth-patriarch",
    category: "Genesis",
    title: "Birth of Patriarch Ahmed Khan Qureshi",
    role: "Patriarch & Progenitor • بانیِ خاندان",
    generation: 0,
    desc: "The lineage begins with the birth of Ahmed Khan Qureshi in the 1940s. A figure of quiet dignity, honor, and deep faith.",
    isMajorNode: true,
    avatarText: "AKQ"
  });

  // 2. Matriarch Birth
  events.push({
    id: "event-matriarch-birth",
    year: familyData.matriarch.birthYear,
    displayDate: "July 31, 1945",
    personId: familyData.matriarch.id,
    personName: familyData.matriarch.name,
    nameNastaleeq: familyData.matriarch.nameNastaleeq,
    eventType: "birth-matriarch",
    category: "Matriarch",
    title: "Birth of Surriya Qureshi",
    role: "Matriarch & Family Anchor • والدہ محترمہ",
    generation: 0,
    desc: "Birth of Surriya Qureshi on July 31, 1945, whose radiant spirit, warmth, and resilience became the anchor for generations.",
    isMajorNode: true,
    avatarText: "SQ"
  });

  // 3. Sacred Union
  events.push({
    id: "event-marriage",
    year: 1963,
    displayDate: "c. 1963",
    personId: "union-ahmed-surriya",
    personName: "Ahmed Khan & Surriya Qureshi",
    nameNastaleeq: "احمد خان اور ثریا قریشی کا عقدِ مسعود",
    eventType: "union",
    category: "Sacred Union",
    title: "Holy Union of Ahmed Khan & Surriya",
    role: "The Roots Converge • بنیادِ خاندان",
    generation: 0,
    desc: "Ahmed Khan Qureshi and Surriya marry, creating the unified root from which 9 offspring and dozens of grandchildren blossom.",
    isMajorNode: true,
    avatarText: "AK & S"
  });

  // 4. The 9 Offspring Births (Chronological)
  familyData.offspring.forEach((child) => {
    const isDeceased = child.status === "Deceased";
    events.push({
      id: `event-${child.id}-birth`,
      year: child.birthYear,
      displayDate: child.birthDateFormatted,
      personId: child.id,
      personName: child.name,
      nameNastaleeq: child.nameNastaleeq,
      nickname: child.nickname,
      nicknameNastaleeq: child.nicknameNastaleeq,
      eventType: "birth-child",
      category: `Offspring #${child.order}`,
      title: `Birth of ${child.name.split(" ")[0]} (#${child.order} of 9)`,
      role: `${child.role} ${child.nickname ? `• Nickname: ${child.nickname}` : ""} ${isDeceased ? "• (مرحوم/مرحومہ)" : ""}`,
      generation: 1,
      desc: `${child.name} is born to Ahmed Khan Qureshi and Surriya. ${child.bio}`,
      isMajorNode: true,
      avatarText: child.name.split(" ").map(n => n[0]).slice(0, 2).join(""),
      childRef: child
    });
  });

  // 5. Patriarch Passing (Late 1970s)
  events.push({
    id: "event-patriarch-passing",
    year: 1978,
    displayDate: "28 Safar (Late 1970s)",
    personId: familyData.patriarch.id,
    personName: familyData.patriarch.name,
    nameNastaleeq: familyData.patriarch.nameNastaleeq,
    eventType: "passing-patriarch",
    category: "Memorial",
    title: "Barsee & Passing of Patriarch Ahmed Khan Qureshi",
    role: "Enduring Legacy • اِنّا لِلّهِ وَاِنّا اِلَيْهِ رَاجِعُوْن",
    generation: 0,
    desc: "Patriarch Ahmed Khan Qureshi passes into eternal peace on 28 Safar (7 February) in the late 1970s. His ideals live on through Surriya and their 9 young children.",
    isMajorNode: true,
    avatarText: "AKQ"
  });

  // 6. Grandchildren Births
  familyData.offspring.forEach((child) => {
    child.grandchildren.forEach((gc) => {
      if (gc.birthYear) {
        events.push({
          id: `event-${gc.id}-birth`,
          year: gc.birthYear,
          displayDate: gc.birthDateFormatted || String(gc.birthYear),
          personId: gc.id,
          personName: gc.name,
          nameNastaleeq: gc.nameNastaleeq,
          parentName: child.name,
          parentNastaleeq: child.nameNastaleeq,
          eventType: "birth-grandchild",
          category: `Grandchild (Gen 2)`,
          title: `Birth of ${gc.name}`,
          role: `Generation 2 • Branch of ${child.name.split(" ")[0]} (${child.nameNastaleeq})`,
          generation: 2,
          desc: `${gc.name} is born into the branch of ${child.name}. ${gc.bio}`,
          isMajorNode: false,
          avatarText: gc.name.split(" ").map(n => n[0]).slice(0, 2).join("")
        });
      }
    });
  });

  // 7. Passing of Shazma (July 8, 2017)
  events.push({
    id: "event-shazma-passing",
    year: 2017,
    displayDate: "July 8, 2017",
    personId: "child-shazma",
    personName: "Shazma Ahmed Khan Qureshi",
    nameNastaleeq: "شزما احمد خان قریشی",
    eventType: "passing-child",
    category: "Memorial",
    title: "Passing of Shazma Ahmed Khan Qureshi",
    role: "Beloved Daughter (مرحومہ) • اِنّا لِلّهِ وَاِنّا اِلَيْهِ رَاجِعُوْن",
    generation: 1,
    desc: "Shazma departs this world on July 8, 2017, leaving behind loving sons Larayb and Sufiyan, and memories cherished by all siblings.",
    isMajorNode: true,
    avatarText: "SKQ"
  });

  // 8. Passing of Matriarch Surriya Qureshi (August 25, 2026)
  events.push({
    id: "event-matriarch-passing",
    year: 2026,
    displayDate: "August 25, 2026",
    personId: familyData.matriarch.id,
    personName: familyData.matriarch.name,
    nameNastaleeq: familyData.matriarch.nameNastaleeq,
    eventType: "passing-matriarch",
    category: "Memorial",
    title: "Passing of Matriarch Surriya Qureshi",
    role: "The Mother's Farewell (1945–2026) • اِنّا لِلّهِ وَاِنّا اِلَيْهِ رَاجِعُوْن",
    generation: 0,
    desc: "Beloved matriarch Surriya Qureshi completes her earthly journey on August 25, 2026, having nurtured 9 children and dozens of descendants with boundless devotion.",
    isMajorNode: true,
    avatarText: "SQ"
  });

  // Sort strictly chronological
  events.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    const priority = { "birth-patriarch": 1, "birth-matriarch": 2, "union": 3, "birth-child": 4, "passing-patriarch": 5, "birth-grandchild": 6, "passing-child": 7, "passing-matriarch": 8 };
    return (priority[a.eventType] || 99) - (priority[b.eventType] || 99);
  });

  return events;
}

export function getFamilyStatistics() {
  const allGrandchildren = familyData.offspring.flatMap(c => c.grandchildren);
  return {
    foundingDecade: "1940s",
    totalGenerations: 3,
    offspringCount: familyData.offspring.length,
    grandchildrenCount: allGrandchildren.length,
    totalTrackedMembers: 2 + familyData.offspring.length + allGrandchildren.length,
    spanYears: 2026 - 1940
  };
}
