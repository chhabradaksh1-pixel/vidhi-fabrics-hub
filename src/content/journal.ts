import cotton from "@/assets/fabric-cotton-linen.jpg";
import jacquard from "@/assets/fabric-katan-jacquard.jpg";
import linen from "@/assets/fabric-linen-shirting.jpg";
import swatchOnCard from "@/assets/swatch-on-card.webp";
import wovenDetail from "@/assets/woven-detail.webp";
import swatchStack from "@/assets/swatch-stack.webp";
import warehouse from "@/assets/warehouse-surat.webp";
import specSamples from "@/assets/spec-samples.webp";
import organza from "@/assets/fabric-beaded-organza.jpg";
import type { Lang } from "@/content/translations";
import { whatsAppUrl } from "@/content/whatsapp";

/** A string carried in all three site languages. */
export type Localized = Record<Lang, string>;
/** A list of strings carried in all three site languages. */
export type LocalizedList = Record<Lang, string[]>;

export type JournalSection = {
  heading: Localized;
  paragraphs: LocalizedList;
  checklist?: LocalizedList;
};

/** A question and answer rendered after the numbered sections. */
export type JournalFaq = {
  question: Localized;
  answer: Localized;
};

/**
 * A closing checklist that sits after the numbered sections, so it stays out
 * of the table of contents.
 */
export type JournalClosing = {
  heading: Localized;
  intro: Localized;
  checklist: LocalizedList;
};

/**
 * A phrase inside the article body that should become a link. The phrase is
 * matched literally against the rendered paragraph text, first occurrence only,
 * so a phrase that does not appear in a given language simply stays plain.
 */
export type JournalInlineLink = {
  phrase: Localized;
  href: string;
};

export type JournalArticle = {
  slug: string;
  image: string;
  imageAlt: Localized;
  category: Localized;
  title: Localized;
  excerpt: Localized;
  introduction: Localized;
  /**
   * A tight, self-contained answer — 40 to 60 words — rendered as a callout
   * before the introduction. Two audiences at once: a human skimming for the
   * conclusion, and an AI answer engine lifting a clean, quotable chunk
   * rather than extracting one from narrative prose. Optional because not
   * every article reduces to one claim; the three specification guides do.
   */
  directAnswer?: Localized;
  sections: JournalSection[];
  /** ISO date. Only set on articles whose publication date is known. */
  published?: string;
  /**
   * Search-facing title, when it should differ from the on-page H1. Falls back
   * to the article title.
   */
  metaTitle?: Localized;
  /**
   * Search-facing description, when it should differ from the listing-card
   * excerpt. Falls back to the excerpt.
   */
  metaDescription?: Localized;
  closing?: JournalClosing;
  faq?: JournalFaq[];
  inlineLinks?: JournalInlineLink[];
  /** Overrides the shared closing CTA copy for this article only. */
  cta?: {
    kicker: Localized;
    heading: Localized;
    body: Localized;
    label: Localized;
  };
  /** Overrides the prefilled WhatsApp message for this article only. */
  whatsAppMessage?: Localized;
  /**
   * Slugs to show in "Keep reading", most relevant first. Omitted falls back to
   * the other articles in publication order.
   */
  related?: string[];
};

/** The guides to show in "Keep reading" for one article, in display order. */
export function relatedArticles(article: JournalArticle, count: number) {
  const available = JOURNAL.filter((item) => item.slug !== article.slug);
  if (!article.related) return available.slice(0, count);
  const preferred = article.related
    .map((slug) => available.find((item) => item.slug === slug))
    .filter((item): item is JournalArticle => Boolean(item));
  const rest = available.filter((item) => !preferred.includes(item));
  return [...preferred, ...rest].slice(0, count);
}

export const JOURNAL: JournalArticle[] = [
  {
    slug: "how-to-read-a-fabric-spec",
    inlineLinks: [
      {
        phrase: {
          en: "descriptive names",
          hi: "वर्णन वाले नामों",
          "hi-en": "varnan wale naamon",
        },
        href: "/blog/why-similar-sarees-have-different-prices",
      },
      {
        phrase: {
          en: "what the cloth weighs",
          hi: "कपड़े के वज़न",
          "hi-en": "kapde ke weight",
        },
        href: "/blog/fabric-gsm-bulk-orders",
      },
      {
        phrase: {
          en: "the width you can actually cut",
          hi: "काटने लायक़ चौड़ाई",
          "hi-en": "kaatne laayak chaudai",
        },
        href: "/blog/fabric-width-and-costing",
      },
    ],
    image: specSamples,
    published: "2026-09-25",
    imageAlt: {
      en: "Textile samples in reds and browns, the form a specification takes before it is a decision",
      hi: "लाल और भूरे रंगों में कपड़े के नमूने — फ़ैसला बनने से पहले स्पेसिफ़िकेशन इसी रूप में होता है",
      "hi-en":
        "Laal aur bhoore rangon mein kapde ke namune — faisla banne se pehle specification isi roop mein hota hai",
    },
    category: {
      en: "Specification guide",
      hi: "स्पेसिफ़िकेशन गाइड",
      "hi-en": "Specification guide",
    },
    metaTitle: {
      en: "How to read a fabric specification",
      hi: "फ़ैब्रिक स्पेसिफ़िकेशन कैसे पढ़ें",
      "hi-en": "Fabric specification kaise padhein",
    },
    title: {
      en: "How to read a fabric specification",
      hi: "फ़ैब्रिक स्पेसिफ़िकेशन कैसे पढ़ें",
      "hi-en": "Fabric specification kaise padhein",
    },
    excerpt: {
      en: "What each field on a spec sheet is actually telling you, which ones decide the cloth, and what the sheet leaves out.",
      hi: "स्पेक शीट का हर ख़ाना असल में क्या बता रहा है, कौन-से ख़ाने कपड़ा तय करते हैं, और शीट क्या नहीं बताती।",
      "hi-en":
        "Spec sheet ka har khaana asal mein kya bata raha hai, kaun se khaane kapda tay karte hain, aur sheet kya nahin batati.",
    },
    directAnswer: {
      en: "A fabric specification is a shortlisting tool, not proof a cloth is right. Composition states fibre content, not behaviour; construction — yarn count, sett and weave — decides drape, opacity and handle far more. Ask for shrinkage, fastness and handle separately, then let an approved physical sample make the final call.",
      hi: "फ़ैब्रिक स्पेसिफ़िकेशन छाँटने का औज़ार है, यह सबूत नहीं कि कपड़ा सही है। कंपोज़िशन रेशे की मात्रा बताता है, बर्ताव नहीं; कंस्ट्रक्शन — यार्न काउंट, सेट और बुनावट — गिरना, पारदर्शिता और पकड़ कहीं ज़्यादा तय करता है। सिकुड़न, रंग की पक्की और पकड़ अलग से माँगिए, फिर आख़िरी फ़ैसला मंज़ूर सैंपल पर छोड़िए।",
      "hi-en":
        "Fabric specification chaantne ka auzaar hai, yeh saboot nahin ki kapda sahi hai. Composition reshe ki maatra batata hai, bartaav nahin; construction — yarn count, sett aur bunavat — girna, transparency aur pakad kahin zyada tay karta hai. Sikudan, rang ki pakki aur pakad alag se maangiye, phir aakhri faisla approved sample par chhodiye.",
    },
    introduction: {
      en: "A specification is a shortlisting tool. It lets you compare candidates without holding them, ask precise questions, and hold a supply to account afterwards. What it cannot do is tell you whether a cloth is right, because the fields that decide how a fabric behaves are not the fields most buyers read first. This guide goes through a spec sheet in the order that matters: what each line is really saying, which lines separate two cloths that look identical on paper, and what the sheet never carries at all.",
      hi: "स्पेसिफ़िकेशन छाँटने का औज़ार है। इससे आप बिना कपड़ा हाथ में लिए विकल्पों की तुलना कर सकते हैं, सटीक सवाल पूछ सकते हैं, और बाद में सप्लाई को जवाबदेह रख सकते हैं। जो यह नहीं कर सकता, वह है यह बताना कि कपड़ा सही है या नहीं — क्योंकि जिन ख़ानों से कपड़े का बर्ताव तय होता है, ज़्यादातर खरीदार उन्हें सबसे बाद में पढ़ते हैं। यह गाइड स्पेक शीट को उसी क्रम में पढ़ती है जो मायने रखता है: हर पंक्ति असल में क्या कह रही है, कौन-सी पंक्तियाँ काग़ज़ पर एक जैसे दिखने वाले दो कपड़ों को अलग करती हैं, और शीट में कभी क्या नहीं होता।",
      "hi-en":
        "Specification chaantne ka auzaar hai. Isse aap bina kapda haath mein liye options ki tulna kar sakte hain, sateek sawaal pooch sakte hain, aur baad mein supply ko jawabdeh rakh sakte hain. Jo yeh nahin kar sakta, wo hai yeh batana ki kapda sahi hai ya nahin — kyunki jin khaanon se kapde ka bartaav tay hota hai, zyadatar khareedar unhe sabse baad mein padhte hain. Yeh guide spec sheet ko usi kram mein padhti hai jo maayne rakhta hai: har pankti asal mein kya keh rahi hai, kaun si panktiyan kaagaz par ek jaise dikhne wale do kapdon ko alag karti hain, aur sheet mein kabhi kya nahin hota.",
    },
    sections: [
      {
        heading: {
          en: "Composition tells you less than the percentage suggests",
          hi: "कंपोज़िशन उतना नहीं बताता जितना प्रतिशत से लगता है",
          "hi-en": "Composition utna nahin batata jitna percentage se lagta hai",
        },
        paragraphs: {
          en: [
            "A blend ratio is a statement about fibre content, not about behaviour. Two cloths both written as 55 per cent cotton and 45 per cent linen can differ in which fibre is in the warp and which in the weft, whether the blend is intimate or plied, and what the linen actually is. Each of those changes shrinkage, dye uptake and handle more than the ratio does.",
            "Ask where the blend happens. A yarn spun from mixed fibre behaves differently from a cloth woven with one fibre one way and another fibre the other, even at an identical stated ratio. The spec sheet rarely says which, and the difference shows up in the first wash.",
            "Treat descriptive names with more caution than percentages. Terms that describe an effect rather than a content — a linen look, a silk finish — are not composition claims and should not be read as though they were.",
          ],
          hi: [
            "ब्लेंड का अनुपात रेशे की मात्रा बताता है, बर्ताव नहीं। 55 प्रतिशत कॉटन और 45 प्रतिशत लिनन लिखे दो कपड़े इस बात में अलग हो सकते हैं कि कौन-सा रेशा ताने में है और कौन-सा बाने में, ब्लेंड धागे के भीतर है या बुनाई में, और लिनन असल में क्या है। इनमें से हर बात सिकुड़न, रंग पकड़ और पकड़ को अनुपात से ज़्यादा बदलती है।",
            "पूछिए कि ब्लेंड कहाँ हो रहा है। मिले-जुले रेशे से काता धागा उस कपड़े से अलग बर्ताव करता है जिसमें एक रेशा एक दिशा में और दूसरा रेशा दूसरी दिशा में बुना है — चाहे लिखा अनुपात एक ही हो। स्पेक शीट शायद ही बताती है कि कौन-सा, और फ़र्क़ पहली धुलाई में दिख जाता है।",
            "प्रतिशत से ज़्यादा एहतियात वर्णन वाले नामों पर बरतिए। जो शब्द मात्रा नहीं बल्कि असर बताते हैं — लिनन लुक, सिल्क फ़िनिश — वे कंपोज़िशन का दावा नहीं हैं और उन्हें वैसा पढ़ना नहीं चाहिए।",
          ],
          "hi-en": [
            "Blend ka anupaat reshe ki maatra batata hai, bartaav nahin. 55 percent cotton aur 45 percent linen likhe do kapde is baat mein alag ho sakte hain ki kaun sa resha taane mein hai aur kaun sa baane mein, blend dhaage ke bheetar hai ya bunai mein, aur linen asal mein kya hai. Inmein se har baat sikudan, rang pakad aur pakad ko anupaat se zyada badalti hai.",
            "Poochiye ki blend kahan ho raha hai. Mile jule reshe se kaata dhaaga us kapde se alag bartaav karta hai jisme ek resha ek disha mein aur doosra resha doosri disha mein buna hai — chahe likha anupaat ek hi ho. Spec sheet shayad hi batati hai ki kaun sa, aur farak pehli dhulai mein dikh jaata hai.",
            "Percentage se zyada ehtiyaat varnan wale naamon par bartiye. Jo shabd maatra nahin balki asar batate hain — linen look, silk finish — wo composition ka daava nahin hain aur unhe waisa padhna nahin chahiye.",
          ],
        },
      },
      {
        heading: {
          en: "Construction is where two identical weights stop being identical",
          hi: "एक जैसे वज़न यहाँ आकर अलग हो जाते हैं",
          "hi-en": "Ek jaise weight yahan aakar alag ho jaate hain",
        },
        paragraphs: {
          en: [
            "Yarn count, ends and picks, and weave are the three fields that explain most differences a buyer notices and cannot name. Count is the fineness of the yarn; ends and picks are how many threads run each way per inch; weave is how they cross. Together they decide drape, opacity, strength and how the surface takes light.",
            "This is also the answer to why what the cloth weighs is not enough on its own. A coarse yarn loosely set and a fine yarn densely set can land on the same weight and behave nothing alike, and the construction fields are where that shows up on paper before it shows up in your hands.",
            "If a specification gives weight and composition but no construction, it is not describing a cloth so much as a category. Ask for count and sett before treating it as a candidate.",
            "As an illustration: a 40s cotton count set densely, at over 100 threads per inch each way, behaves differently from the same 40s count set loosely, at around 60 threads per inch. The weight of the two can land close together; only the count-and-sett line on the specification tells them apart.",
          ],
          hi: [
            "यार्न काउंट, ताने-बाने की संख्या, और बुनावट — ये तीन ख़ाने ज़्यादातर उन फ़र्क़ों को समझाते हैं जो खरीदार महसूस करता है पर नाम नहीं दे पाता। काउंट धागे की बारीकी है; ताने-बाने की संख्या बताती है कि हर इंच में कितने धागे किस दिशा में जाते हैं; बुनावट बताती है कि वे कैसे एक-दूसरे को काटते हैं। मिलकर ये तय करते हैं कि कपड़ा कैसे गिरता है, कितना पारदर्शी है, कितना मज़बूत है और सतह रोशनी को कैसे लेती है।",
            "यही जवाब है कि कपड़े के वज़न भर से काम क्यों नहीं चलता। मोटा धागा ढीला बैठाया और बारीक धागा कसा बैठाया — दोनों एक ही वज़न पर आ सकते हैं और बर्ताव बिल्कुल अलग कर सकते हैं, और कंस्ट्रक्शन के ख़ाने वही जगह हैं जहाँ यह हाथ में आने से पहले काग़ज़ पर दिख जाता है।",
            "अगर स्पेसिफ़िकेशन में वज़न और कंपोज़िशन है पर कंस्ट्रक्शन नहीं, तो वह कपड़े का नहीं, एक श्रेणी का वर्णन है। उसे विकल्प मानने से पहले काउंट और सेट पूछिए।",
            "उदाहरण के तौर पर: 40s कॉटन काउंट को घनी बुनावट में, हर दिशा में 100 से ज़्यादा धागे प्रति इंच पर बिठाया जाए, तो वह उसी 40s काउंट से अलग बर्ताव करता है जो ढीली बुनावट में लगभग 60 धागे प्रति इंच पर बिठाया गया हो। दोनों का वज़न पास-पास आ सकता है; इन्हें अलग सिर्फ़ स्पेसिफ़िकेशन की काउंट-और-सेट वाली पंक्ति ही बताती है।",
          ],
          "hi-en": [
            "Yarn count, taane baane ki sankhya, aur bunavat — ye teen khaane zyadatar un farakon ko samjhate hain jo khareedar mehsoos karta hai par naam nahin de paata. Count dhaage ki baareeki hai; taane baane ki sankhya batati hai ki har inch mein kitne dhaage kis disha mein jaate hain; bunavat batati hai ki wo kaise ek doosre ko kaatte hain. Milkar ye tay karte hain ki kapda kaise girta hai, kitna transparent hai, kitna mazboot hai aur satah roshni ko kaise leti hai.",
            "Yahi jawaab hai ki kapde ke weight bhar se kaam kyun nahin chalta. Mota dhaaga dheela baithaya aur baareek dhaaga kasa baithaya — dono ek hi weight par aa sakte hain aur bartaav bilkul alag kar sakte hain, aur construction ke khaane wahi jagah hain jahan yeh haath mein aane se pehle kaagaz par dikh jaata hai.",
            "Agar specification mein weight aur composition hai par construction nahin, to wo kapde ka nahin, ek shreni ka varnan hai. Use option maanne se pehle count aur sett poochiye.",
            "Udaharan ke taur par: 40s cotton count ko ghani bunavat mein, har disha mein 100 se zyada dhaage prati inch par bithaya jaaye, to wo usi 40s count se alag bartaav karta hai jo dheeli bunavat mein lagbhag 60 dhaage prati inch par bithaya gaya ho. Dono ka weight paas paas aa sakta hai; inhe alag sirf specification ki count-aur-sett wali pankti hi batati hai.",
          ],
        },
      },
      {
        heading: {
          en: "Finish changes the cloth, and not all of it lasts",
          hi: "फ़िनिश कपड़ा बदल देती है, और पूरी टिकती नहीं",
          "hi-en": "Finish kapda badal deti hai, aur poori tikti nahin",
        },
        paragraphs: {
          en: [
            "A finish is applied after weaving and it can move nearly every property on the sheet, including weight and the width you can actually cut. Mercerising, calendering, sanforising, easy-care resins and coatings each change something, and a figure quoted before finishing is not the figure that arrives.",
            "Ask how permanent a finish is, because the answer differs sharply. A mechanical finish set into the fibre behaves differently over a garment life from a surface treatment that washes out over some number of cycles. A cloth chosen for a handle that disappears after five washes was chosen on a property it did not really have.",
            "Where a finish carries a performance claim, ask what standard it was tested to and whether a report exists. An untested claim on a spec sheet is a description, not a specification.",
          ],
          hi: [
            "फ़िनिश बुनाई के बाद लगती है और शीट की लगभग हर बात को हिला सकती है — वज़न और काटने लायक़ चौड़ाई समेत। मर्सराइज़िंग, कैलेंडरिंग, सैनफ़राइज़िंग, ईज़ी-केयर रेज़िन और कोटिंग — हर एक कुछ न कुछ बदलती है, और फ़िनिशिंग से पहले बताया आँकड़ा वह नहीं होता जो पहुँचता है।",
            "पूछिए कि फ़िनिश कितनी टिकाऊ है, क्योंकि जवाब बहुत अलग होते हैं। रेशे में बैठी यांत्रिक फ़िनिश कपड़े की पूरी उम्र में उस सतही उपचार से अलग बर्ताव करती है जो कुछ धुलाइयों में निकल जाता है। जिस पकड़ के लिए कपड़ा चुना गया और वह पाँच धुलाई में चली गई — तो वह कपड़ा ऐसी ख़ूबी पर चुना गया जो उसमें थी ही नहीं।",
            "जहाँ फ़िनिश के साथ कोई प्रदर्शन-दावा हो, पूछिए कि उसकी जाँच किस मानक पर हुई और रिपोर्ट है या नहीं। बिना जाँचा दावा स्पेक शीट पर वर्णन है, स्पेसिफ़िकेशन नहीं।",
          ],
          "hi-en": [
            "Finish bunai ke baad lagti hai aur sheet ki lagbhag har baat ko hila sakti hai — weight aur kaatne laayak chaudai samet. Mercerising, calendering, sanforising, easy-care resin aur coating — har ek kuch na kuch badalti hai, aur finishing se pehle bataya aankda wo nahin hota jo pahunchta hai.",
            "Poochiye ki finish kitni tikaau hai, kyunki jawaab bahut alag hote hain. Reshe mein baithi mechanical finish kapde ki poori umar mein us satahi upchaar se alag bartaav karti hai jo kuch dhulaiyon mein nikal jaata hai. Jis pakad ke liye kapda chuna gaya aur wo paanch dhulai mein chali gayi — to wo kapda aisi khoobi par chuna gaya jo usme thi hi nahin.",
            "Jahan finish ke saath koi performance daava ho, poochiye ki uski jaanch kis maanak par hui aur report hai ya nahin. Bina jaancha daava spec sheet par varnan hai, specification nahin.",
          ],
        },
      },
      {
        heading: {
          en: "What the sheet leaves out",
          hi: "शीट में क्या नहीं होता",
          "hi-en": "Sheet mein kya nahin hota",
        },
        paragraphs: {
          en: [
            "Shrinkage, colourfastness and handle are the three that matter most and appear least. None of them can be inferred from weight, composition or construction with any confidence, and all three decide whether a buyer accepts the finished goods.",
            "Ask for them separately and in writing. Residual shrinkage after washing — tested to ISO 6330 — fastness to washing, rubbing and light, and a physical sample for handle. These are ordinary requests and a supplier who cannot answer them is telling you something useful.",
            "Then let the sample decide. The specification is how you get from many candidates to a few and how you hold a lot to account once it ships; the cloth in your hand is the only thing that tells you it is right.",
          ],
          hi: [
            "सिकुड़न, रंग की पक्की टिकाऊपन और पकड़ — ये तीन सबसे ज़्यादा मायने रखती हैं और सबसे कम दिखती हैं। इनमें से किसी का भरोसे लायक़ अंदाज़ा वज़न, कंपोज़िशन या कंस्ट्रक्शन से नहीं लगाया जा सकता, और तीनों तय करती हैं कि खरीदार तैयार माल लेगा या नहीं।",
            "इन्हें अलग से और लिखित में माँगिए। धुलाई के बाद बची सिकुड़न — ISO 6330 से जाँची गई — धुलाई, रगड़ और रोशनी पर रंग की पक्की; और पकड़ के लिए असली सैंपल। ये आम माँगें हैं, और जो सप्लायर इनका जवाब न दे सके, वह आपको एक काम की बात बता रहा है।",
            "फिर फ़ैसला सैंपल पर छोड़िए। स्पेसिफ़िकेशन से आप बहुत सारे विकल्पों से कुछ तक पहुँचते हैं और माल भेजे जाने के बाद उसे जवाबदेह रखते हैं; हाथ में आया कपड़ा ही अकेली चीज़ है जो बताती है कि वह सही है।",
          ],
          "hi-en": [
            "Sikudan, rang ki pakki tikaupan aur pakad — ye teen sabse zyada maayne rakhti hain aur sabse kam dikhti hain. Inmein se kisi ka bharose laayak andaza weight, composition ya construction se nahin lagaya ja sakta, aur teenon tay karti hain ki khareedar taiyaar maal lega ya nahin.",
            "Inhe alag se aur likhit mein maangiye. Dhulai ke baad bachi sikudan — ISO 6330 se jaanchi gayi — dhulai, ragad aur roshni par rang ki pakki; aur pakad ke liye asli sample. Ye aam maangein hain, aur jo supplier inka jawaab na de sake, wo aapko ek kaam ki baat bata raha hai.",
            "Phir faisla sample par chhodiye. Specification se aap bahut saare options se kuch tak pahunchte hain aur maal bheje jaane ke baad use jawabdeh rakhte hain; haath mein aaya kapda hi akeli cheez hai jo batati hai ki wo sahi hai.",
          ],
        },
      },
    ],
    closing: {
      heading: {
        en: "Fields to require on any quotation",
        hi: "हर कोटेशन में ये ख़ाने माँगिए",
        "hi-en": "Har quotation mein ye khaane maangiye",
      },
      intro: {
        en: "A specification carrying all of these can be compared. One missing half of them cannot.",
        hi: "जिस स्पेसिफ़िकेशन में ये सब हों, उसकी तुलना हो सकती है। जिसमें आधे न हों, उसकी नहीं।",
        "hi-en":
          "Jis specification mein ye sab hon, uski tulna ho sakti hai. Jisme aadhe na hon, uski nahin.",
      },
      checklist: {
        en: [
          "Composition, with where the blend happens — yarn or weave",
          "Yarn count, and ends and picks per inch",
          "Weave, named rather than described",
          "Weight, stated as greige or finished, with a tolerance",
          "Cuttable width, stated as greige or finished, with a tolerance",
          "Finish, with how permanent it is and any standard it was tested to",
          "Residual shrinkage and fastness figures, asked for separately",
        ],
        hi: [
          "कंपोज़िशन, और यह कि ब्लेंड कहाँ है — धागे में या बुनाई में",
          "यार्न काउंट, और प्रति इंच ताने-बाने की संख्या",
          "बुनावट, वर्णन नहीं — नाम से",
          "वज़न, ग्रे या फ़िनिश्ड बताकर, छूट के साथ",
          "काटने लायक़ चौड़ाई, ग्रे या फ़िनिश्ड बताकर, छूट के साथ",
          "फ़िनिश, कितनी टिकाऊ है और किस मानक पर जाँची गई",
          "बची सिकुड़न और रंग की पक्की के आँकड़े, अलग से माँगे गए",
        ],
        "hi-en": [
          "Composition, aur yeh ki blend kahan hai — dhaage mein ya bunai mein",
          "Yarn count, aur prati inch taane baane ki sankhya",
          "Bunavat, varnan nahin — naam se",
          "Weight, grey ya finished batakar, tolerance ke saath",
          "Kaatne laayak chaudai, grey ya finished batakar, tolerance ke saath",
          "Finish, kitni tikaau hai aur kis maanak par jaanchi gayi",
          "Bachi sikudan aur rang ki pakki ke aankde, alag se maange gaye",
        ],
      },
    },
    faq: [
      {
        question: {
          en: "Which fields should I insist on before asking for a sample?",
          hi: "सैंपल माँगने से पहले कौन-से ख़ाने ज़रूर माँगने चाहिए?",
          "hi-en": "Sample maangne se pehle kaun se khaane zaroor maangne chahiye?",
        },
        answer: {
          en: "Composition, weight with its tolerance, cuttable width with its tolerance, and construction — count, sett and weave. Those four let you rule out most candidates on paper, which is the whole purpose of a specification. Everything else is better settled against the sample.",
          hi: "कंपोज़िशन, छूट सहित वज़न, छूट सहित काटने लायक़ चौड़ाई, और कंस्ट्रक्शन — काउंट, सेट और बुनावट। इन चार से आप ज़्यादातर विकल्प काग़ज़ पर ही छाँट सकते हैं, और स्पेसिफ़िकेशन का पूरा मक़सद यही है। बाक़ी सब सैंपल के सामने तय करना बेहतर है।",
          "hi-en":
            "Composition, tolerance sahit weight, tolerance sahit kaatne laayak chaudai, aur construction — count, sett aur bunavat. In chaar se aap zyadatar options kaagaz par hi chaant sakte hain, aur specification ka poora maqsad yahi hai. Baaki sab sample ke saamne tay karna behtar hai.",
        },
      },
      {
        question: {
          en: "Two suppliers describe the same cloth differently. Which one is right?",
          hi: "दो सप्लायर एक ही कपड़े का वर्णन अलग करते हैं। सही कौन है?",
          "hi-en": "Do supplier ek hi kapde ka varnan alag karte hain. Sahi kaun hai?",
        },
        answer: {
          en: "Often both, describing different stages or different fields. One may be quoting greige where the other quotes finished, or naming a weave where the other names an effect. Put the two sheets side by side field for field and the disagreement usually turns out to be a gap rather than a contradiction.",
          hi: "अक्सर दोनों — बस वे अलग चरण या अलग ख़ाने बता रहे होते हैं। हो सकता है एक ग्रे का आँकड़ा दे रहा हो और दूसरा फ़िनिश्ड का, या एक बुनावट का नाम दे और दूसरा असर का। दोनों शीट को ख़ाने-दर-ख़ाने आमने-सामने रखिए, और मतभेद आम तौर पर विरोधाभास नहीं, कमी निकलता है।",
          "hi-en":
            "Aksar dono — bas wo alag charan ya alag khaane bata rahe hote hain. Ho sakta hai ek grey ka aankda de raha ho aur doosra finished ka, ya ek bunavat ka naam de aur doosra asar ka. Dono sheet ko khaane dar khaane aamne saamne rakhiye, aur matbhed aam taur par virodhabhaas nahin, kami nikalta hai.",
        },
      },
      {
        question: {
          en: "The composition says one thing but the cloth handles like another. Is the sheet wrong?",
          hi: "कंपोज़िशन कुछ कहता है पर कपड़ा कुछ और लगता है। क्या शीट ग़लत है?",
          "hi-en": "Composition kuch kehta hai par kapda kuch aur lagta hai. Kya sheet galat hai?",
        },
        answer: {
          en: "Usually not. Handle comes from construction and finish far more than from fibre content, so a stated composition can be accurate while the cloth feels nothing like what you expected. Check count, sett and finish before questioning the composition — that is where the explanation almost always sits.",
          hi: "आम तौर पर नहीं। पकड़ रेशे की मात्रा से कहीं ज़्यादा कंस्ट्रक्शन और फ़िनिश से आती है, इसलिए लिखा कंपोज़िशन सही हो सकता है और कपड़ा फिर भी उम्मीद से बिल्कुल अलग लग सकता है। कंपोज़िशन पर सवाल उठाने से पहले काउंट, सेट और फ़िनिश देखिए — जवाब लगभग हमेशा वहीं होता है।",
          "hi-en":
            "Aam taur par nahin. Pakad reshe ki maatra se kahin zyada construction aur finish se aati hai, isliye likha composition sahi ho sakta hai aur kapda phir bhi ummeed se bilkul alag lag sakta hai. Composition par sawaal uthane se pehle count, sett aur finish dekhiye — jawaab lagbhag hamesha wahin hota hai.",
        },
      },
    ],
    related: ["fabric-gsm-bulk-orders", "fabric-width-and-costing"],
  },
  {
    slug: "fabric-width-and-costing",
    inlineLinks: [
      {
        phrase: {
          en: "what the cloth weighs",
          hi: "कपड़े का वज़न",
          "hi-en": "kapde ka weight",
        },
        href: "/blog/fabric-gsm-bulk-orders",
      },
    ],
    image: warehouse,
    published: "2026-09-24",
    imageAlt: {
      en: "Rolls of cloth stacked by width, where yardage and costing actually meet",
      hi: "चौड़ाई के हिसाब से रखे कपड़े के थान — जहाँ गज़ और लागत असल में मिलते हैं",
      "hi-en":
        "Chaudai ke hisaab se rakhe kapde ke than — jahan gaz aur laagat asal mein milte hain",
    },
    category: {
      en: "Specification guide",
      hi: "स्पेसिफ़िकेशन गाइड",
      "hi-en": "Specification guide",
    },
    metaTitle: {
      en: "Fabric width and costing explained",
      hi: "कपड़े की चौड़ाई और लागत",
      "hi-en": "Kapde ki chaudai aur laagat",
    },
    title: {
      en: "Fabric width and what it does to your costing",
      hi: "कपड़े की चौड़ाई और आपकी लागत पर उसका असर",
      "hi-en": "Kapde ki chaudai aur aapki laagat par uska asar",
    },
    excerpt: {
      en: "Why the cheaper metre is often the dearer garment, and why extra width only helps when it fits another piece across.",
      hi: "सस्ता मीटर अक्सर महँगा कपड़ा क्यों बन जाता है, और ज़्यादा चौड़ाई तभी काम आती है जब उसमें एक और पीस बैठ जाए।",
      "hi-en":
        "Sasta meter aksar mehenga kapda kyun ban jaata hai, aur zyada chaudai tabhi kaam aati hai jab usme ek aur piece baith jaaye.",
    },
    directAnswer: {
      en: "A wider cloth is only cheaper if it lets you cut another pattern piece across it. Compare cost per piece, not rate per metre: divide the rate by how many pieces your own pattern yields at that width. Cuttable width excludes selvedges, and a quoted figure is often greige, not finished.",
      hi: "चौड़ा कपड़ा तभी सस्ता है जब उसमें एक और पैटर्न पीस आड़े बैठ जाए। प्रति मीटर दर नहीं, प्रति पीस लागत की तुलना कीजिए: उस चौड़ाई पर आपका पैटर्न प्रति मीटर जितने पीस देता है, दर को उससे बाँटिए। काटने लायक़ चौड़ाई में किनारे शामिल नहीं, और बताई गई चौड़ाई अक्सर ग्रे की होती है, फ़िनिश्ड की नहीं।",
      "hi-en":
        "Chauda kapda tabhi sasta hai jab usme ek aur pattern piece aade baith jaaye. Prati meter dar nahin, prati piece laagat ki tulna kijiye: us chaudai par aapka pattern prati meter jitne piece deta hai, dar ko usse baantiye. Kaatne laayak chaudai mein kinare shaamil nahin, aur batai gayi chaudai aksar grey ki hoti hai, finished ki nahin.",
    },
    introduction: {
      en: "Width is the specification buyers check last and pay for first. Two quotations at the same rate per metre are not the same offer if the cloth is a different width, and a wider cloth is not automatically the better buy either. What decides it is whether the extra width lets you cut another piece across — and often it does not, in which case you are paying for cloth that goes into the waste. This guide covers the arithmetic, the difference between the width quoted and the width you can cut, and what to establish before comparing two prices.",
      hi: "चौड़ाई वह स्पेसिफ़िकेशन है जिसे खरीदार सबसे आख़िर में देखते हैं और जिसका पैसा सबसे पहले देते हैं। एक ही प्रति मीटर दर पर दो कोटेशन एक जैसी पेशकश नहीं हैं, अगर कपड़े की चौड़ाई अलग है — और चौड़ा कपड़ा अपने आप बेहतर सौदा भी नहीं होता। फ़ैसला इस बात से होता है कि बढ़ी हुई चौड़ाई में एक और पीस आड़े में बैठता है या नहीं — और अक्सर नहीं बैठता, यानी आप उस कपड़े का पैसा दे रहे हैं जो कतरन में जाएगा। यह गाइड बताती है इसका गणित, कोटेशन की चौड़ाई और काटने लायक़ चौड़ाई का फ़र्क़, और दो दाम तुलना करने से पहले क्या पक्का कर लेना चाहिए।",
      "hi-en":
        "Chaudai wo specification hai jise khareedar sabse aakhir mein dekhte hain aur jiska paisa sabse pehle dete hain. Ek hi prati meter dar par do quotation ek jaisi peshkash nahin hain, agar kapde ki chaudai alag hai — aur chauda kapda apne aap behtar sauda bhi nahin hota. Faisla is baat se hota hai ki badhi hui chaudai mein ek aur piece aade mein baithta hai ya nahin — aur aksar nahin baithta, yaani aap us kapde ka paisa de rahe hain jo katran mein jaayega. Yeh guide batati hai iska ganit, quotation ki chaudai aur kaatne laayak chaudai ka farak, aur do daam tulna karne se pehle kya pakka kar lena chahiye.",
    },
    sections: [
      {
        heading: {
          en: "Rate per metre and cost per garment are different questions",
          hi: "प्रति मीटर दर और प्रति कपड़ा लागत — दो अलग सवाल",
          "hi-en": "Prati meter dar aur prati kapda laagat — do alag sawaal",
        },
        paragraphs: {
          en: [
            "A metre of 58 inch cloth carries about 32 per cent more material than a metre of 44 inch cloth, because 58 divided by 44 is 1.32. Quoted at the same rate per metre, the narrower cloth is therefore around a third dearer for the same quantity of material.",
            "That arithmetic is easy and it is also not the answer. You do not buy material, you buy pieces cut from it. What you actually need to know is how many pieces come off a metre of each width — and that depends on your pattern, not on the ratio.",
            "So a rate per metre is only comparable between cloths of identical width. Across different widths it tells you almost nothing on its own.",
          ],
          hi: [
            "58 इंच चौड़े कपड़े के एक मीटर में 44 इंच वाले एक मीटर से लगभग 32 प्रतिशत ज़्यादा माल होता है, क्योंकि 58 बँटा 44 बराबर 1.32 है। एक ही प्रति मीटर दर पर, यानी उतने ही माल के लिए पतला कपड़ा करीब एक-तिहाई महँगा पड़ता है।",
            "यह गणित आसान है, और यही जवाब नहीं है। आप माल नहीं खरीदते, आप उसमें से कटने वाले पीस खरीदते हैं। असल में जानने की बात यह है कि हर चौड़ाई के एक मीटर से कितने पीस निकलते हैं — और वह आपके पैटर्न पर निर्भर है, अनुपात पर नहीं।",
            "इसलिए प्रति मीटर दर की तुलना सिर्फ़ एक ही चौड़ाई के कपड़ों के बीच हो सकती है। अलग-अलग चौड़ाई में वह अकेले लगभग कुछ नहीं बताती।",
          ],
          "hi-en": [
            "58 inch chaude kapde ke ek meter mein 44 inch wale ek meter se lagbhag 32 percent zyada maal hota hai, kyunki 58 banta 44 barabar 1.32 hai. Ek hi prati meter dar par, yaani utne hi maal ke liye patla kapda kareeb ek tihai mehenga padta hai.",
            "Yeh ganit aasan hai, aur yahi jawaab nahin hai. Aap maal nahin khareedte, aap usme se katne wale piece khareedte hain. Asal mein jaanne ki baat yeh hai ki har chaudai ke ek meter se kitne piece nikalte hain — aur wo aapke pattern par nirbhar hai, anupaat par nahin.",
            "Isliye prati meter dar ki tulna sirf ek hi chaudai ke kapdon ke beech ho sakti hai. Alag alag chaudai mein wo akele lagbhag kuch nahin batati.",
          ],
        },
      },
      {
        heading: {
          en: "Extra width only helps when another piece fits across",
          hi: "बढ़ी चौड़ाई तभी काम की है जब एक और पीस आड़े बैठे",
          "hi-en": "Badhi chaudai tabhi kaam ki hai jab ek aur piece aade baithe",
        },
        paragraphs: {
          en: [
            "Take a pattern piece 26 inches wide. Across 58 inch cloth two of them fit, using 52 inches and wasting 6. Across 44 inch cloth only one fits, using 26 and wasting 18. Here the wider cloth yields twice as much per metre and is clearly the cheaper garment even at a higher rate.",
            "Now take a piece 30 inches wide. Across 58 inch cloth one fits, wasting 28 inches. Across 44 inch cloth one fits, wasting 14. Both widths give you the same single piece per metre — so the wider cloth has produced nothing extra, and every rupee of the width premium has gone into the cutting waste. On that pattern the narrower cloth is the better buy.",
            "This is why the same fabric at the same rate can be economical for one buyer and wasteful for another. Width is not a quality, it is a fit against your pattern, and nobody but you knows the pattern.",
          ],
          hi: [
            "मान लीजिए एक पैटर्न पीस 26 इंच चौड़ा है। 58 इंच कपड़े में आड़े दो पीस बैठते हैं — 52 इंच इस्तेमाल, 6 इंच बर्बाद। 44 इंच में सिर्फ़ एक बैठता है — 26 इंच इस्तेमाल, 18 बर्बाद। यहाँ चौड़ा कपड़ा प्रति मीटर दोगुना देता है और ऊँची दर पर भी साफ़ तौर पर सस्ता कपड़ा बनता है।",
            "अब 30 इंच चौड़ा पीस लीजिए। 58 इंच कपड़े में एक बैठता है — 28 इंच बर्बाद। 44 इंच में भी एक बैठता है — 14 इंच बर्बाद। दोनों चौड़ाई प्रति मीटर वही एक पीस देती हैं — यानी चौड़े कपड़े ने कुछ अतिरिक्त नहीं दिया, और चौड़ाई का पूरा अतिरिक्त पैसा कतरन में गया। उस पैटर्न पर पतला कपड़ा बेहतर सौदा है।",
            "इसीलिए वही कपड़ा उसी दर पर एक खरीदार के लिए किफ़ायती और दूसरे के लिए बर्बादी हो सकता है। चौड़ाई कोई गुण नहीं है, वह आपके पैटर्न से मेल है — और पैटर्न आपके सिवा कोई नहीं जानता।",
          ],
          "hi-en": [
            "Maan lijiye ek pattern piece 26 inch chauda hai. 58 inch kapde mein aade do piece baithte hain — 52 inch istemaal, 6 inch barbaad. 44 inch mein sirf ek baithta hai — 26 inch istemaal, 18 barbaad. Yahan chauda kapda prati meter doguna deta hai aur oonchi dar par bhi saaf taur par sasta kapda banta hai.",
            "Ab 30 inch chauda piece lijiye. 58 inch kapde mein ek baithta hai — 28 inch barbaad. 44 inch mein bhi ek baithta hai — 14 inch barbaad. Dono chaudai prati meter wahi ek piece deti hain — yaani chaude kapde ne kuch atirikt nahin diya, aur chaudai ka poora atirikt paisa katran mein gaya. Us pattern par patla kapda behtar sauda hai.",
            "Isiliye wahi kapda usi dar par ek khareedar ke liye kifayati aur doosre ke liye barbaadi ho sakta hai. Chaudai koi gun nahin hai, wo aapke pattern se mel hai — aur pattern aapke siva koi nahin jaanta.",
          ],
        },
      },
      {
        heading: {
          en: "The width quoted and the width you can cut",
          hi: "कोटेशन की चौड़ाई और काटने लायक़ चौड़ाई",
          "hi-en": "Quotation ki chaudai aur kaatne laayak chaudai",
        },
        paragraphs: {
          en: [
            "A quoted width is usually the full width including selvedges, and selvedges are not cuttable. How much they take varies with the loom and the finish, and on some cloths the outer inch or two is also distorted or shaded differently enough to be unusable. Cuttable width is the number your marker actually runs on.",
            "Finishing moves the figure too. Cloth can come off the loom at one width and out of the finishing range narrower, and a width quoted from greige is not the width that arrives. This is the same problem as reading what the cloth weighs from a greige figure rather than a finished one.",
            "So ask for cuttable width, ask whether the figure is greige or finished, and ask what tolerance applies. Width varies between lots for the same reasons weight does.",
          ],
          hi: [
            "कोटेशन में दी गई चौड़ाई आम तौर पर किनारों सहित पूरी चौड़ाई होती है, और किनारे काटने लायक़ नहीं होते। वे कितना लेते हैं यह लूम और फ़िनिश पर बदलता है, और कुछ कपड़ों में बाहरी एक-दो इंच का शेड या बुनावट भी इतनी अलग होती है कि वह इस्तेमाल लायक़ नहीं रहती। काटने लायक़ चौड़ाई वही आँकड़ा है जिस पर आपका मार्कर असल में चलता है।",
            "फ़िनिशिंग भी आँकड़े को हिलाती है। कपड़ा लूम से एक चौड़ाई पर उतर सकता है और फ़िनिशिंग रेंज से पतला निकल सकता है, और ग्रे से बताई गई चौड़ाई वह नहीं होती जो पहुँचती है। यह वही समस्या है जो कपड़े का वज़न ग्रे आँकड़े से पढ़ने में होती है।",
            "इसलिए काटने लायक़ चौड़ाई पूछिए, पूछिए कि आँकड़ा ग्रे का है या फ़िनिश्ड का, और पूछिए कि छूट कितनी है। चौड़ाई लॉट-दर-लॉट उन्हीं वजहों से बदलती है जिनसे वज़न बदलता है।",
          ],
          "hi-en": [
            "Quotation mein di gayi chaudai aam taur par kinaron sahit poori chaudai hoti hai, aur kinare kaatne laayak nahin hote. Wo kitna lete hain yeh loom aur finish par badalta hai, aur kuch kapdon mein bahari ek do inch ka shade ya bunavat bhi itni alag hoti hai ki wo istemaal laayak nahin rehti. Kaatne laayak chaudai wahi aankda hai jis par aapka marker asal mein chalta hai.",
            "Finishing bhi aankde ko hilati hai. Kapda loom se ek chaudai par utar sakta hai aur finishing range se patla nikal sakta hai, aur grey se batai gayi chaudai wo nahin hoti jo pahunchti hai. Yeh wahi samasya hai jo kapde ka weight grey aankde se padhne mein hoti hai.",
            "Isliye kaatne laayak chaudai poochiye, poochiye ki aankda grey ka hai ya finished ka, aur poochiye ki tolerance kitni hai. Chaudai lot dar lot unhi wajahon se badalti hai jinse weight badalta hai.",
          ],
        },
      },
      {
        heading: {
          en: "Comparing two quotations at different widths",
          hi: "अलग-अलग चौड़ाई के दो कोटेशन की तुलना",
          "hi-en": "Alag alag chaudai ke do quotation ki tulna",
        },
        paragraphs: {
          en: [
            "Do not convert to a rate per square metre and stop there. It is the right arithmetic for comparing material and the wrong arithmetic for comparing cost, because it assumes you can use every inch, which the previous section shows you usually cannot.",
            "Lay the pattern out instead, even roughly. Work out how many pieces come off one metre at each width, divide the rate per metre by that number, and compare the results. That figure is cost per piece, and it is the only comparison that survives contact with a cutting table.",
            "Where the widths give the same yield, take the narrower cloth. Where the wider one yields more, the premium is worth paying up to the point where the yields converge again.",
          ],
          hi: [
            "प्रति वर्ग मीटर दर निकालकर वहीं मत रुकिए। माल की तुलना के लिए वह सही गणित है और लागत की तुलना के लिए ग़लत, क्योंकि वह मानकर चलता है कि आप हर इंच इस्तेमाल कर सकते हैं — और पिछला हिस्सा दिखाता है कि आम तौर पर नहीं कर सकते।",
            "इसके बजाय पैटर्न बिछाइए, मोटे तौर पर भी चलेगा। निकालिए कि हर चौड़ाई पर एक मीटर से कितने पीस आते हैं, प्रति मीटर दर को उस संख्या से बाँटिए, और नतीजों की तुलना कीजिए। वह आँकड़ा प्रति पीस लागत है, और कटाई की मेज़ से टकराने के बाद यही एक तुलना टिकती है।",
            "जहाँ दोनों चौड़ाई से उतने ही पीस निकलें, पतला कपड़ा लीजिए। जहाँ चौड़े से ज़्यादा निकलें, वहाँ अतिरिक्त दाम उस बिंदु तक देना सही है जहाँ दोनों की उपज फिर बराबर हो जाए।",
          ],
          "hi-en": [
            "Prati varg meter dar nikaalkar wahin mat rukiye. Maal ki tulna ke liye wo sahi ganit hai aur laagat ki tulna ke liye galat, kyunki wo maankar chalta hai ki aap har inch istemaal kar sakte hain — aur pichhla hissa dikhata hai ki aam taur par nahin kar sakte.",
            "Iske bajaye pattern bichhaiye, mote taur par bhi chalega. Nikaaliye ki har chaudai par ek meter se kitne piece aate hain, prati meter dar ko us sankhya se baantiye, aur nateejon ki tulna kijiye. Wo aankda prati piece laagat hai, aur kataai ki mez se takraane ke baad yahi ek tulna tikti hai.",
            "Jahan dono chaudai se utne hi piece niklein, patla kapda lijiye. Jahan chaude se zyada niklein, wahan atirikt daam us bindu tak dena sahi hai jahan dono ki upaj phir barabar ho jaaye.",
          ],
        },
      },
    ],
    closing: {
      heading: {
        en: "What to establish before comparing prices",
        hi: "दाम तुलना करने से पहले क्या पक्का कीजिए",
        "hi-en": "Daam tulna karne se pehle kya pakka kijiye",
      },
      intro: {
        en: "Four answers turn two incomparable quotations into a decision.",
        hi: "चार जवाब दो बेमेल कोटेशन को एक फ़ैसले में बदल देते हैं।",
        "hi-en": "Chaar jawaab do bemel quotation ko ek faisle mein badal dete hain.",
      },
      checklist: {
        en: [
          "Cuttable width, not full width including selvedges",
          "Whether the width quoted is greige or finished",
          "The width tolerance, and whether it varies between lots",
          "How many pieces your own pattern yields per metre at that width",
        ],
        hi: [
          "काटने लायक़ चौड़ाई, किनारों सहित पूरी चौड़ाई नहीं",
          "बताई गई चौड़ाई ग्रे की है या फ़िनिश्ड की",
          "चौड़ाई की छूट, और यह कि वह लॉट-दर-लॉट बदलती है या नहीं",
          "उस चौड़ाई पर आपके अपने पैटर्न से प्रति मीटर कितने पीस निकलते हैं",
        ],
        "hi-en": [
          "Kaatne laayak chaudai, kinaron sahit poori chaudai nahin",
          "Batai gayi chaudai grey ki hai ya finished ki",
          "Chaudai ki tolerance, aur yeh ki wo lot dar lot badalti hai ya nahin",
          "Us chaudai par aapke apne pattern se prati meter kitne piece nikalte hain",
        ],
      },
    },
    faq: [
      {
        question: {
          en: "Is wider fabric always cheaper in the end?",
          hi: "क्या चौड़ा कपड़ा आख़िर में हमेशा सस्ता पड़ता है?",
          "hi-en": "Kya chauda kapda aakhir mein hamesha sasta padta hai?",
        },
        answer: {
          en: "No. It is cheaper only when the extra width fits another pattern piece across. If it does not, the additional width becomes cutting waste that you have paid for, and a narrower cloth at a lower rate gives the same yield for less.",
          hi: "नहीं। वह तभी सस्ता है जब बढ़ी हुई चौड़ाई में एक और पैटर्न पीस आड़े बैठ जाए। अगर नहीं बैठता, तो अतिरिक्त चौड़ाई कतरन बन जाती है जिसका पैसा आपने दिया है, और कम दर पर पतला कपड़ा उतनी ही उपज कम पैसे में दे देता है।",
          "hi-en":
            "Nahin. Wo tabhi sasta hai jab badhi hui chaudai mein ek aur pattern piece aade baith jaaye. Agar nahin baithta, to atirikt chaudai katran ban jaati hai jiska paisa aapne diya hai, aur kam dar par patla kapda utni hi upaj kam paise mein de deta hai.",
        },
      },
      {
        question: {
          en: "What is cuttable width?",
          hi: "काटने लायक़ चौड़ाई क्या है?",
          "hi-en": "Kaatne laayak chaudai kya hai?",
        },
        answer: {
          en: "The width your marker can actually use, once the selvedges and any distorted or off-shade edge are excluded. A quoted width usually includes the selvedges, so cuttable width is always the smaller of the two figures and the only one worth costing against.",
          hi: "वह चौड़ाई जो आपका मार्कर असल में इस्तेमाल कर सकता है — किनारे और कोई भी बिगड़ा या अलग शेड वाला सिरा हटाने के बाद। कोटेशन की चौड़ाई में आम तौर पर किनारे शामिल होते हैं, इसलिए काटने लायक़ चौड़ाई हमेशा दोनों में छोटी होती है, और लागत उसी पर निकालनी चाहिए।",
          "hi-en":
            "Wo chaudai jo aapka marker asal mein istemaal kar sakta hai — kinare aur koi bhi bigda ya alag shade wala sira hataane ke baad. Quotation ki chaudai mein aam taur par kinare shaamil hote hain, isliye kaatne laayak chaudai hamesha dono mein chhoti hoti hai, aur laagat usi par nikaalni chahiye.",
        },
      },
      {
        question: {
          en: "Can I just convert both quotations to a rate per square metre?",
          hi: "क्या मैं दोनों कोटेशन को प्रति वर्ग मीटर दर में बदल दूँ?",
          "hi-en": "Kya main dono quotation ko prati varg meter dar mein badal doon?",
        },
        answer: {
          en: "It is a fair comparison of material and a poor comparison of cost, because it assumes every inch of width gets used. Convert to cost per piece instead: pieces per metre at that width, divided into the rate per metre. That is the number your cutting table will agree with.",
          hi: "माल की तुलना के लिए वह ठीक है, लागत की तुलना के लिए कमज़ोर — क्योंकि वह मानता है कि चौड़ाई का हर इंच इस्तेमाल होगा। इसके बजाय प्रति पीस लागत निकालिए: उस चौड़ाई पर प्रति मीटर पीस, और उसमें प्रति मीटर दर को बाँटिए। कटाई की मेज़ इसी आँकड़े से सहमत होगी।",
          "hi-en":
            "Maal ki tulna ke liye wo theek hai, laagat ki tulna ke liye kamzor — kyunki wo maanta hai ki chaudai ka har inch istemaal hoga. Iske bajaye prati piece laagat nikaaliye: us chaudai par prati meter piece, aur usme prati meter dar ko baantiye. Kataai ki mez isi aankde se sehmat hogi.",
        },
      },
      {
        question: {
          en: "Does width change between lots?",
          hi: "क्या चौड़ाई लॉट-दर-लॉट बदलती है?",
          "hi-en": "Kya chaudai lot dar lot badalti hai?",
        },
        answer: {
          en: "It can, for the same reasons weight does — loom tension, finishing route and batch. Agree a tolerance on width as well as on weight, and say which direction matters, because a cloth arriving narrower than costed changes your yield on every metre of the lot.",
          hi: "बदल सकती है, उन्हीं वजहों से जिनसे वज़न बदलता है — लूम टेंशन, फ़िनिशिंग का रास्ता और बैच। वज़न की तरह चौड़ाई पर भी छूट तय कीजिए, और यह भी कहिए कि किस तरफ़ का फ़र्क़ अहम है, क्योंकि लागत से पतला आया कपड़ा लॉट के हर मीटर पर आपकी उपज बदल देता है।",
          "hi-en":
            "Badal sakti hai, unhi wajahon se jinse weight badalta hai — loom tension, finishing ka raasta aur batch. Weight ki tarah chaudai par bhi tolerance tay kijiye, aur yeh bhi kahiye ki kis taraf ka farak ahem hai, kyunki laagat se patla aaya kapda lot ke har meter par aapki upaj badal deta hai.",
        },
      },
    ],
    related: ["fabric-gsm-bulk-orders", "sample-to-bulk-order-checklist"],
  },
  {
    slug: "fabric-gsm-bulk-orders",
    inlineLinks: [
      {
        phrase: {
          en: "the rest of the specification",
          hi: "बाक़ी स्पेसिफ़िकेशन",
          "hi-en": "baaki specification",
        },
        href: "/blog/sample-to-bulk-order-checklist",
      },
    ],
    image: jacquard,
    published: "2026-09-24",
    imageAlt: {
      en: "A dense rust-red jacquard, the kind of construction where weight and handle diverge",
      hi: "घनी बुनाई वाला रस्ट-लाल जैक्वार्ड — ऐसी बुनावट जिसमें वज़न और पकड़ अलग-अलग बातें होती हैं",
      "hi-en":
        "Ghani bunai wala rust-red jacquard — aisi bunavat jisme weight aur pakad alag alag baatein hoti hain",
    },
    category: {
      en: "Specification guide",
      hi: "स्पेसिफ़िकेशन गाइड",
      "hi-en": "Specification guide",
    },
    metaTitle: {
      en: "Fabric GSM explained for bulk orders",
      hi: "कपड़े का GSM: बल्क ऑर्डर के लिए",
      "hi-en": "Fabric GSM: bulk order ke liye",
    },
    title: {
      en: "What GSM means when you order in bulk",
      hi: "बल्क ऑर्डर में GSM का क्या मतलब है",
      "hi-en": "Bulk order mein GSM ka kya matlab hai",
    },
    excerpt: {
      en: "Why the weight you specify and the weight you receive are not the same number, and what to write on the order instead.",
      hi: "जो वज़न आप लिखते हैं और जो माल में आता है, वे एक ही आँकड़ा क्यों नहीं होते — और ऑर्डर पर इसके बजाय क्या लिखना चाहिए।",
      "hi-en":
        "Jo weight aap likhte hain aur jo maal mein aata hai, wo ek hi aankda kyun nahin hote — aur order par iske bajaye kya likhna chahiye.",
    },
    directAnswer: {
      en: "GSM (grams per square metre) is a fabric’s weight, not its quality. The figure a mill quotes and the figure you receive can legitimately differ — greige versus finished cloth, humidity and lot variance all move it — so agree a tolerance and a direction in writing, and check it with a cutter or a weighed 10x10cm square.",
      hi: "GSM (ग्राम प्रति वर्ग मीटर) कपड़े का वज़न है, गुणवत्ता नहीं। मिल जो आँकड़ा बताती है और जो आपको मिलता है, वे जायज़ तौर पर अलग हो सकते हैं — ग्रे बनाम फ़िनिश्ड कपड़ा, नमी और लॉट की भिन्नता, सब इसे हिलाते हैं — इसलिए छूट और दिशा लिखित में तय कीजिए, और कटर या तौले गए 10x10cm टुकड़े से जाँचिए।",
      "hi-en":
        "GSM (gram prati varg meter) kapde ka weight hai, quality nahin. Mill jo aankda batati hai aur jo aapko milta hai, wo jaayaz taur par alag ho sakte hain — grey banaam finished kapda, nami aur lot ki bhinnata, sab ise hilate hain — isliye tolerance aur disha likhit mein tay kijiye, aur cutter ya tole gaye 10x10cm tukde se jaanchiye.",
    },
    introduction: {
      en: "GSM is the number buyers quote most often and argue about most easily. It is a useful figure and a narrow one: it tells you what a cloth weighs over a fixed area and nothing else. Most weight disputes are not really about weight — they are about a figure that was never defined, never toleranced, and never checked the same way by both sides. This guide covers what the number does and does not carry, why the mill’s figure and yours can legitimately differ, and how to write it on an order so it means the same thing to everybody.",
      hi: "GSM वह आँकड़ा है जिसका ज़िक्र खरीदार सबसे ज़्यादा करते हैं और जिस पर झगड़ा सबसे जल्दी होता है। यह काम का आँकड़ा है, पर सीमित है: यह बताता है कि तय क्षेत्र में कपड़े का वज़न कितना है, और इससे आगे कुछ नहीं। वज़न के ज़्यादातर विवाद असल में वज़न के बारे में नहीं होते — वे उस आँकड़े के बारे में होते हैं जिसकी परिभाषा तय नहीं हुई, जिसमें छूट नहीं लिखी गई, और जिसे दोनों पक्षों ने एक ही तरीक़े से नहीं जाँचा। यह गाइड बताती है कि यह आँकड़ा क्या बताता है और क्या नहीं, मिल का आँकड़ा और आपका आँकड़ा जायज़ तौर पर अलग क्यों हो सकते हैं, और ऑर्डर पर इसे कैसे लिखें ताकि सबके लिए इसका एक ही मतलब हो।",
      "hi-en":
        "GSM wo aankda hai jiska zikr khareedar sabse zyada karte hain aur jis par jhagda sabse jaldi hota hai. Yeh kaam ka aankda hai, par seemit hai: yeh batata hai ki tay kshetra mein kapde ka weight kitna hai, aur isse aage kuch nahin. Weight ke zyadatar vivaad asal mein weight ke baare mein nahin hote — wo us aankde ke baare mein hote hain jiski paribhasha tay nahin hui, jisme tolerance nahin likhi gayi, aur jise dono taraf ne ek hi tareeke se nahin jaancha. Yeh guide batati hai ki yeh aankda kya batata hai aur kya nahin, mill ka aankda aur aapka aankda jaayaz taur par alag kyun ho sakte hain, aur order par ise kaise likhein taki sabke liye iska ek hi matlab ho.",
    },
    sections: [
      {
        heading: {
          en: "GSM is a weight, not a grade",
          hi: "GSM वज़न है, दर्जा नहीं",
          "hi-en": "GSM weight hai, grade nahin",
        },
        paragraphs: {
          en: [
            "GSM is grams per square metre. It describes how much a cloth weighs over a fixed area, and that is the whole of it. It is not a quality score, and a higher number is not a better fabric.",
            "The right number is the one the end use needs. A shirting at 120 GSM and an upholstery cloth at 400 GSM are each correct for their purpose and each useless for the other. Most arguments about weight are really arguments about fitness for use that nobody wrote down.",
            "So ask what the cloth has to do before asking what it should weigh. The answer to the first question narrows the second to a range, and a range is what you should be specifying anyway.",
          ],
          hi: [
            "GSM का मतलब है ग्राम प्रति वर्ग मीटर। यह बताता है कि तय क्षेत्र में कपड़े का वज़न कितना है — बस इतना ही। यह गुणवत्ता का दर्जा नहीं है, और बड़ा नंबर बेहतर कपड़ा नहीं होता।",
            "सही नंबर वही है जो इस्तेमाल की ज़रूरत हो। 120 GSM की शर्टिंग और 400 GSM का अपहोल्स्ट्री कपड़ा — दोनों अपने काम के लिए सही हैं और दूसरे के काम के लिए बेकार। वज़न पर होने वाली ज़्यादातर बहसें असल में इस बात पर होती हैं कि कपड़ा किस काम के लिए है, और वह कहीं लिखा नहीं गया।",
            "इसलिए पहले पूछिए कि कपड़े को करना क्या है, फिर पूछिए कि उसका वज़न कितना होना चाहिए। पहले सवाल का जवाब दूसरे को एक दायरे तक ले आता है — और दायरा ही वह चीज़ है जो आपको लिखनी चाहिए।",
          ],
          "hi-en": [
            "GSM ka matlab hai gram prati varg meter. Yeh batata hai ki tay kshetra mein kapde ka weight kitna hai — bas itna hi. Yeh quality ka grade nahin hai, aur bada number behtar kapda nahin hota.",
            "Sahi number wahi hai jo istemaal ki zaroorat ho. 120 GSM ki shirting aur 400 GSM ka upholstery kapda — dono apne kaam ke liye sahi hain aur doosre ke kaam ke liye bekaar. Weight par hone wali zyadatar behsein asal mein is baat par hoti hain ki kapda kis kaam ke liye hai, aur wo kahin likha nahin gaya.",
            "Isliye pehle poochiye ki kapde ko karna kya hai, phir poochiye ki uska weight kitna hona chahiye. Pehle sawaal ka jawaab doosre ko ek daayre tak le aata hai — aur daayra hi wo cheez hai jo aapko likhni chahiye.",
          ],
        },
      },
      {
        heading: {
          en: "Why the weight you specify and the weight you receive differ",
          hi: "जो वज़न आप लिखते हैं और जो आता है, वे अलग क्यों होते हैं",
          "hi-en": "Jo weight aap likhte hain aur jo aata hai, wo alag kyun hote hain",
        },
        paragraphs: {
          en: [
            "Greige cloth and finished cloth do not weigh the same. Washing, singeing, mercerising, calendering, dyeing and coating each move the figure, some up and some down. A mill quoting greige weight and a mill quoting finished weight are not quoting the same thing, and two quotations are not comparable until you know which is which.",
            "Moisture accounts for more than most buyers expect. Cotton and viscose hold atmospheric moisture, so the same roll weighs differently in a humid Surat monsoon and a dry north Indian winter. Laboratory figures are taken at conditioned humidity; a weighing on a warehouse floor is not, and the gap between them is real rather than anybody’s error.",
            "Loom and lot variance covers the rest. Tension, pick density and yarn batch all shift a little across a production run and more between runs. This is ordinary, it is why a single figure is a target rather than a promise, and it is the reason the next section matters more than this one.",
          ],
          hi: [
            "ग्रे कपड़ा और फ़िनिश्ड कपड़ा एक जैसा वज़न नहीं रखते। धुलाई, सिंजिंग, मर्सराइज़िंग, कैलेंडरिंग, रंगाई और कोटिंग — हर प्रक्रिया आँकड़े को हिलाती है, कुछ ऊपर और कुछ नीचे। ग्रे वज़न बताने वाली मिल और फ़िनिश्ड वज़न बताने वाली मिल एक ही चीज़ नहीं बता रही हैं, और जब तक आप जान न लें कि कौन-सा कौन है, दो कोटेशन की तुलना नहीं हो सकती।",
            "नमी का असर ज़्यादातर खरीदारों की उम्मीद से बड़ा होता है। कॉटन और विस्कोस हवा की नमी पकड़ते हैं, इसलिए वही थान सूरत के उमस भरे मानसून में और उत्तर भारत की सूखी सर्दी में अलग वज़न दिखाता है। लैब के आँकड़े तय नमी पर लिए जाते हैं; गोदाम के फ़र्श पर किया गया वज़न नहीं — और दोनों के बीच का फ़र्क़ असली है, किसी की ग़लती नहीं।",
            "बाक़ी हिस्सा लूम और लॉट की भिन्नता का है। टेंशन, पिक डेंसिटी और यार्न बैच — सब एक प्रोडक्शन रन में थोड़ा और अलग-अलग रन के बीच ज़्यादा बदलते हैं। यह सामान्य है, इसी वजह से एक अकेला आँकड़ा लक्ष्य होता है वादा नहीं, और इसी वजह से अगला हिस्सा इससे ज़्यादा अहम है।",
          ],
          "hi-en": [
            "Grey kapda aur finished kapda ek jaisa weight nahin rakhte. Dhulai, singeing, mercerising, calendering, rangai aur coating — har process aankde ko hilati hai, kuch upar aur kuch neeche. Grey weight batane wali mill aur finished weight batane wali mill ek hi cheez nahin bata rahi hain, aur jab tak aap jaan na lein ki kaun sa kaun hai, do quotation ki tulna nahin ho sakti.",
            "Nami ka asar zyadatar khareedaron ki ummeed se bada hota hai. Cotton aur viscose hawa ki nami pakadte hain, isliye wahi than Surat ke umas bhare monsoon mein aur north India ki sookhi sardi mein alag weight dikhata hai. Lab ke aankde tay nami par liye jaate hain; godam ke farsh par kiya gaya weight nahin — aur dono ke beech ka farak asli hai, kisi ki galti nahin.",
            "Baaki hissa loom aur lot ki bhinnata ka hai. Tension, pick density aur yarn batch — sab ek production run mein thoda aur alag alag run ke beech zyada badalte hain. Yeh normal hai, isi wajah se ek akela aankda lakshya hota hai vaada nahin, aur isi wajah se agla hissa isse zyada ahem hai.",
          ],
        },
      },
      {
        heading: {
          en: "Agree a tolerance, not just a number",
          hi: "सिर्फ़ नंबर नहीं, छूट भी तय कीजिए",
          "hi-en": "Sirf number nahin, tolerance bhi tay kijiye",
        },
        paragraphs: {
          en: [
            "Write the weight as a figure with a stated tolerance, or as a range. In the trade it is usually expressed as a percentage either side, and around five per cent is a figure often used — but the number matters far less than the fact that it was agreed rather than assumed. A tolerance nobody recorded becomes an argument the first time a lot lands light.",
            "Say which direction matters to you, because they are different instructions. A garment maker costing yardage per piece usually cares that the cloth is not heavier than specified. A buyer worried about handle and opacity cares that it is not lighter. A supplier cannot infer which one you meant, and will not guess the same way you would.",
            "Keep it with the rest of the specification, against the product code both sides use, so the weight cannot drift away from the sample it was agreed alongside.",
          ],
          hi: [
            "वज़न को छूट के साथ लिखिए, या दायरे के रूप में। व्यापार में इसे आम तौर पर दोनों तरफ़ के प्रतिशत में लिखा जाता है, और लगभग पाँच प्रतिशत का आँकड़ा अक्सर इस्तेमाल होता है — पर नंबर से कहीं ज़्यादा अहम यह है कि वह तय किया गया हो, मान लिया गया न हो। जो छूट किसी ने दर्ज नहीं की, वह पहली बार माल हल्का आने पर झगड़ा बन जाती है।",
            "यह भी कहिए कि आपके लिए किस तरफ़ का फ़र्क़ अहम है, क्योंकि ये दो अलग हिदायतें हैं। प्रति पीस गज़ का हिसाब लगाने वाले गारमेंट मेकर के लिए अहम है कि कपड़ा तय वज़न से भारी न हो। पकड़ और पारदर्शिता की चिंता करने वाले खरीदार के लिए अहम है कि वह हल्का न हो। सप्लायर अंदाज़ा नहीं लगा सकता कि आपका मतलब कौन-सा था, और वह आपकी तरह अंदाज़ा भी नहीं लगाएगा।",
            "इसे बाक़ी स्पेसिफ़िकेशन के साथ ही रखिए, उसी प्रोडक्ट कोड के सामने जो दोनों पक्ष इस्तेमाल करते हैं, ताकि वज़न उस सैंपल से अलग न हो जाए जिसके साथ वह तय हुआ था।",
          ],
          "hi-en": [
            "Weight ko tolerance ke saath likhiye, ya daayre ke roop mein. Vyapar mein ise aam taur par dono taraf ke percentage mein likha jaata hai, aur lagbhag paanch percent ka aankda aksar istemaal hota hai — par number se kahin zyada ahem yeh hai ki wo tay kiya gaya ho, maan liya gaya na ho. Jo tolerance kisi ne record nahin ki, wo pehli baar maal halka aane par jhagda ban jaati hai.",
            "Yeh bhi kahiye ki aapke liye kis taraf ka farak ahem hai, kyunki ye do alag hidayatein hain. Prati piece gaz ka hisaab lagane wale garment maker ke liye ahem hai ki kapda tay weight se bhaari na ho. Pakad aur transparency ki chinta karne wale khareedar ke liye ahem hai ki wo halka na ho. Supplier andaza nahin laga sakta ki aapka matlab kaun sa tha, aur wo aapki tarah andaza bhi nahin lagayega.",
            "Ise baaki specification ke saath hi rakhiye, usi product code ke saamne jo dono paksh istemaal karte hain, taki weight us sample se alag na ho jaaye jiske saath wo tay hua tha.",
          ],
        },
      },
      {
        heading: {
          en: "How to check the weight when the lot arrives",
          hi: "माल पहुँचने पर वज़न कैसे जाँचें",
          "hi-en": "Maal pahunchne par weight kaise jaanchein",
        },
        paragraphs: {
          en: [
            "A GSM cutter takes a disc of 100 square centimetres. Weigh the disc in grams and multiply by 100 to get grams per square metre. Without a cutter, cut a square of 10 by 10 centimetres as accurately as you can, weigh it on a scale that reads to a hundredth of a gram, and multiply by 100. The arithmetic is identical; the error moves into the cutting.",
            "Take several samples rather than one. Weight varies across the width and along the length, so sample near both selvedges and near the middle, and from more than one roll. One disc from the end of one roll tells you about that disc.",
            "Record the average and the spread, not just the average. A lot that averages the specified weight with a wide spread is a different problem from a lot sitting consistently under it, and the two lead to different conversations with the supplier.",
            "Written on the order, that can be one line: “±5% tolerance on weight, tested to ISO 3801, disputes settled against the approved sample.” The number, the standard and the reference for a dispute all sit in the same sentence.",
          ],
          hi: [
            "GSM कटर 100 वर्ग सेंटीमीटर का गोल टुकड़ा काटता है। उस टुकड़े को ग्राम में तोलिए और 100 से गुणा कीजिए — यही ग्राम प्रति वर्ग मीटर है। कटर न हो तो 10 गुणा 10 सेंटीमीटर का चौकोर टुकड़ा जितना सही काट सकें काटिए, ग्राम के सौवें हिस्से तक पढ़ने वाले तराज़ू पर तोलिए, और 100 से गुणा कीजिए। गणित वही है; ग़लती कटाई में चली जाती है।",
            "एक नहीं, कई नमूने लीजिए। वज़न चौड़ाई में और लंबाई में बदलता है, इसलिए दोनों किनारों के पास और बीच से नमूने लीजिए, और एक से ज़्यादा थान से। एक थान के सिरे से लिया गया एक टुकड़ा उसी टुकड़े के बारे में बताता है।",
            "औसत के साथ बिखराव भी दर्ज कीजिए, सिर्फ़ औसत नहीं। जिस लॉट का औसत तय वज़न पर है पर बिखराव बड़ा है, वह उस लॉट से अलग समस्या है जो लगातार तय वज़न से नीचे बैठा है — और दोनों पर सप्लायर से बातचीत अलग होती है।",
            "ऑर्डर पर लिखा हुआ यह एक पंक्ति में समा सकता है: “वज़न में ±5% छूट, ISO 3801 से जाँची गई, विवाद मंज़ूर सैंपल के सामने सुलझेंगे।” नंबर, मानक और विवाद का रेफ़रेंस — तीनों एक ही वाक्य में।",
          ],
          "hi-en": [
            "GSM cutter 100 varg centimeter ka gol tukda kaatta hai. Us tukde ko gram mein toliye aur 100 se guna kijiye — yahi gram prati varg meter hai. Cutter na ho to 10 guna 10 centimeter ka chaukor tukda jitna sahi kaat sakein kaatiye, gram ke sauven hisse tak padhne wale taraazu par toliye, aur 100 se guna kijiye. Ganit wahi hai; galti kataai mein chali jaati hai.",
            "Ek nahin, kai namune lijiye. Weight chaudai mein aur lambai mein badalta hai, isliye dono kinaron ke paas aur beech se namune lijiye, aur ek se zyada than se. Ek than ke sire se liya gaya ek tukda usi tukde ke baare mein batata hai.",
            "Ausat ke saath bikhraav bhi record kijiye, sirf ausat nahin. Jis lot ka ausat tay weight par hai par bikhraav bada hai, wo us lot se alag samasya hai jo lagatar tay weight se neeche baitha hai — aur dono par supplier se baatcheet alag hoti hai.",
            "Order par likha hua yeh ek pankti mein sama sakta hai: “Weight mein ±5% tolerance, ISO 3801 se jaanchi gayi, vivaad approved sample ke saamne suljhenge.” Number, standard aur vivaad ka reference — teeno ek hi vaakya mein.",
          ],
        },
      },
      {
        heading: {
          en: "Where GSM stops telling you anything",
          hi: "GSM कहाँ जाकर कुछ नहीं बताता",
          "hi-en": "GSM kahan jaakar kuch nahin batata",
        },
        paragraphs: {
          en: [
            "Two fabrics at the same weight can behave nothing alike. Yarn count, weave, twist and finish decide drape, opacity, handle and how the cloth takes a dye, and none of them appear in the weight. A loosely woven 140 GSM cloth in a coarse yarn and a tightly woven 140 GSM cloth in a fine one are not substitutes, whatever their specification sheets have in common.",
            "This is why an approved sample outranks a number. The specification lets you shortlist candidates and hold a supply to account afterwards; the physical cloth is what tells you whether it is right in the first place. Use the figure to narrow the field and the sample to decide.",
          ],
          hi: [
            "एक ही वज़न के दो कपड़े बिल्कुल अलग बर्ताव कर सकते हैं। यार्न काउंट, बुनावट, बल और फ़िनिश — ये तय करते हैं कि कपड़ा कैसे गिरता है, कितना पारदर्शी है, हाथ में कैसा लगता है और रंग कैसे पकड़ता है, और इनमें से कोई भी वज़न में नहीं दिखता। मोटे धागे का ढीला बुना 140 GSM और बारीक धागे का कसा बुना 140 GSM — ये एक-दूसरे की जगह नहीं ले सकते, चाहे उनकी स्पेसिफ़िकेशन शीट में कितना भी मेल हो।",
            "इसीलिए मंज़ूर सैंपल किसी नंबर से ऊपर है। स्पेसिफ़िकेशन से आप विकल्प छाँटते हैं और बाद में सप्लाई को जवाबदेह रखते हैं; कपड़ा हाथ में लेकर ही पता चलता है कि वह सही है या नहीं। नंबर से दायरा छोटा कीजिए और सैंपल से फ़ैसला।",
          ],
          "hi-en": [
            "Ek hi weight ke do kapde bilkul alag bartaav kar sakte hain. Yarn count, bunavat, bal aur finish — ye tay karte hain ki kapda kaise girta hai, kitna transparent hai, haath mein kaisa lagta hai aur rang kaise pakadta hai, aur inmein se koi bhi weight mein nahin dikhta. Mote dhaage ka dheela buna 140 GSM aur baareek dhaage ka kasa buna 140 GSM — ye ek doosre ki jagah nahin le sakte, chahe unki specification sheet mein kitna bhi mel ho.",
            "Isiliye approved sample kisi number se upar hai. Specification se aap options chaantte hain aur baad mein supply ko jawabdeh rakhte hain; kapda haath mein lekar hi pata chalta hai ki wo sahi hai ya nahin. Number se daayra chhota kijiye aur sample se faisla.",
          ],
        },
      },
    ],
    closing: {
      heading: {
        en: "What to put on the order",
        hi: "ऑर्डर पर क्या लिखें",
        "hi-en": "Order par kya likhein",
      },
      intro: {
        en: "Five lines, and the weight stops being a source of argument.",
        hi: "पाँच पंक्तियाँ, और वज़न झगड़े की जड़ नहीं रहता।",
        "hi-en": "Paanch panktiyan, aur weight jhagde ki jad nahin rehta.",
      },
      checklist: {
        en: [
          "The weight, and whether the figure is greige or finished",
          "The tolerance, as a percentage either side",
          "Which direction of variance matters to you, and why",
          "The product code the approved sample sits against",
          "How the weight will be checked on arrival — against ISO 3801 — and by whom",
        ],
        hi: [
          "वज़न, और यह कि आँकड़ा ग्रे का है या फ़िनिश्ड का",
          "छूट, दोनों तरफ़ के प्रतिशत में",
          "आपके लिए किस तरफ़ का फ़र्क़ अहम है, और क्यों",
          "वह प्रोडक्ट कोड जिसके सामने मंज़ूर सैंपल रखा है",
          "पहुँचने पर वज़न कैसे जाँचा जाएगा — ISO 3801 के अनुसार — और कौन जाँचेगा",
        ],
        "hi-en": [
          "Weight, aur yeh ki aankda grey ka hai ya finished ka",
          "Tolerance, dono taraf ke percentage mein",
          "Aapke liye kis taraf ka farak ahem hai, aur kyun",
          "Wo product code jiske saamne approved sample rakha hai",
          "Pahunchne par weight kaise jaancha jaayega — ISO 3801 ke anusaar — aur kaun jaanchega",
        ],
      },
    },
    faq: [
      {
        question: {
          en: "Is a higher GSM better quality?",
          hi: "ज़्यादा GSM का मतलब बेहतर गुणवत्ता है?",
          "hi-en": "Zyada GSM ka matlab behtar quality hai?",
        },
        answer: {
          en: "No. GSM is a weight and quality is a judgement about construction, yarn and finish. A heavy cloth woven from poor yarn is a heavy poor cloth. Weight only tells you whether a fabric is suited to the use you have in mind.",
          hi: "नहीं। GSM वज़न है, और गुणवत्ता बुनावट, धागे और फ़िनिश पर बनने वाली राय है। ख़राब धागे से बुना भारी कपड़ा भारी ख़राब कपड़ा ही होता है। वज़न सिर्फ़ यह बताता है कि कपड़ा आपके सोचे हुए इस्तेमाल के लायक़ है या नहीं।",
          "hi-en":
            "Nahin. GSM weight hai, aur quality bunavat, dhaage aur finish par banne wali raay hai. Kharab dhaage se buna bhaari kapda bhaari kharab kapda hi hota hai. Weight sirf yeh batata hai ki kapda aapke soche hue istemaal ke laayak hai ya nahin.",
        },
      },
      {
        question: {
          en: "Why do two suppliers quote different GSM for what looks like the same fabric?",
          hi: "एक जैसे दिखने वाले कपड़े का GSM दो सप्लायर अलग-अलग क्यों बताते हैं?",
          "hi-en": "Ek jaise dikhne wale kapde ka GSM do supplier alag alag kyun batate hain?",
        },
        answer: {
          en: "Usually because one figure is greige and the other finished, or because they were measured under different humidity, or because one is a nominal specification and the other an actual weighing. Ask which of those a number is before treating two quotations as comparable.",
          hi: "आम तौर पर इसलिए कि एक आँकड़ा ग्रे का है और दूसरा फ़िनिश्ड का, या दोनों अलग नमी में नापे गए, या एक नाममात्र स्पेसिफ़िकेशन है और दूसरा असल तुलाई। दो कोटेशन को तुलना लायक़ मानने से पहले पूछिए कि कौन-सा आँकड़ा किस तरह का है।",
          "hi-en":
            "Aam taur par isliye ki ek aankda grey ka hai aur doosra finished ka, ya dono alag nami mein naape gaye, ya ek naam-matra specification hai aur doosra asal tulai. Do quotation ko tulna laayak maanne se pehle poochiye ki kaun sa aankda kis tarah ka hai.",
        },
      },
      {
        question: {
          en: "Can I check GSM without a GSM cutter?",
          hi: "GSM कटर के बिना GSM जाँच सकते हैं?",
          "hi-en": "GSM cutter ke bina GSM jaanch sakte hain?",
        },
        answer: {
          en: "Yes. Cut a 10 by 10 centimetre square, weigh it on a scale reading to a hundredth of a gram, and multiply by 100. The method is sound; the accuracy depends entirely on how squarely you cut, so take several samples and average them.",
          hi: "हाँ। 10 गुणा 10 सेंटीमीटर का चौकोर टुकड़ा काटिए, ग्राम के सौवें हिस्से तक पढ़ने वाले तराज़ू पर तोलिए, और 100 से गुणा कीजिए। तरीक़ा ठीक है; सटीकता पूरी तरह इस पर है कि कटाई कितनी सही हुई — इसलिए कई नमूने लेकर औसत निकालिए।",
          "hi-en":
            "Haan. 10 guna 10 centimeter ka chaukor tukda kaatiye, gram ke sauven hisse tak padhne wale taraazu par toliye, aur 100 se guna kijiye. Tareeka theek hai; accuracy poori tarah is par hai ki kataai kitni sahi hui — isliye kai namune lekar ausat nikaaliye.",
        },
      },
      {
        question: {
          en: "The lot is within tolerance but feels wrong. What now?",
          hi: "लॉट छूट के अंदर है पर पकड़ ठीक नहीं लगती। अब क्या?",
          "hi-en": "Lot tolerance ke andar hai par pakad theek nahin lagti. Ab kya?",
        },
        answer: {
          en: "Then weight was the wrong thing to have specified on its own. Handle comes from yarn and construction, so the conversation has to move to those and to the approved sample rather than to the number. It is also the argument for approving a physical sample instead of a specification sheet.",
          hi: "तो अकेले वज़न लिखना ही ग़लत था। पकड़ धागे और बुनावट से आती है, इसलिए बातचीत उन पर और मंज़ूर सैंपल पर आनी चाहिए, नंबर पर नहीं। यही वजह है कि स्पेसिफ़िकेशन शीट की जगह कपड़े का सैंपल मंज़ूर करना चाहिए।",
          "hi-en":
            "To akele weight likhna hi galat tha. Pakad dhaage aur bunavat se aati hai, isliye baatcheet un par aur approved sample par aani chahiye, number par nahin. Yahi wajah hai ki specification sheet ki jagah kapde ka sample approve karna chahiye.",
        },
      },
    ],
    related: ["sample-to-bulk-order-checklist", "why-similar-sarees-have-different-prices"],
  },
  {
    slug: "source-fabric-from-surat",
    image: swatchStack,
    published: "2026-09-16",
    metaTitle: {
      en: "How to Source Fabric from Surat Remotely",
      hi: "दूर बैठे सूरत से कपड़ा कैसे मंगवाएँ",
      "hi-en": "Remote rehkar Surat se fabric kaise mangwayein",
    },
    metaDescription: {
      en: "A wholesale buyer’s guide to sourcing fabric from Surat remotely, covering requirements, samples, quotations, bulk approval, dispatch and delivery.",
      hi: "दूर बैठे सूरत से कपड़ा मंगवाने की थोक खरीदार गाइड — ज़रूरत, सैंपल, कोटेशन, बल्क मंज़ूरी, डिस्पैच और डिलीवरी तक।",
      "hi-en":
        "Remote rehkar Surat se fabric mangwane ki wholesale buyer guide — requirement, sample, quotation, bulk approval, dispatch aur delivery tak.",
    },
    imageAlt: {
      en: "Folded fabric samples laid out in a colour run, ready to be compared",
      hi: "रंगों के क्रम में रखे तह किए हुए कपड़े के सैंपल, तुलना के लिए तैयार",
      "hi-en": "Rangon ke kram mein rakhe folded fabric samples, comparison ke liye taiyar",
    },
    category: {
      en: "Sourcing guide",
      hi: "सोर्सिंग गाइड",
      "hi-en": "Sourcing guide",
    },
    title: {
      en: "How to Source Fabric from Surat Without Visiting the Market",
      hi: "बाज़ार जाए बिना सूरत से कपड़ा कैसे मंगवाएँ",
      "hi-en": "Market jaaye bina Surat se fabric kaise mangwayein",
    },
    excerpt: {
      en: "A practical remote-sourcing process for comparing fabric options, approving samples and placing a wholesale order with clearer terms.",
      hi: "दूर बैठे सोर्सिंग का एक काम आने वाला तरीक़ा — कपड़े के विकल्प परखने, सैंपल मंज़ूर करने और साफ़ शर्तों पर थोक ऑर्डर देने के लिए।",
      "hi-en":
        "Remote sourcing ka ek practical tareeka — fabric options compare karne, sample approve karne aur clear terms par wholesale order dene ke liye.",
    },
    introduction: {
      en: "Surat is one of India’s major textile centres, but sourcing from the city does not always require visiting every market, mill or processing unit in person. Many wholesale requirements can be handled remotely when the buyer provides a clear brief, compares equivalent options and approves the right sample before placing a bulk order. The difficult part is not finding fabric photographs. It is making sure that the fabric shown, the quotation received and the material eventually supplied all refer to the same requirement. The following process can help retailers, brands, garment manufacturers and wholesalers source fabric from Surat with greater clarity — even when they are buying from another city or country.",
      hi: "सूरत भारत के बड़े टेक्सटाइल केंद्रों में से एक है, लेकिन यहाँ से कपड़ा मंगवाने के लिए हर बाज़ार, मिल या प्रोसेसिंग यूनिट में ख़ुद जाना ज़रूरी नहीं। कई थोक ज़रूरतें दूर बैठे ही पूरी हो सकती हैं — बशर्ते खरीदार साफ़ ब्रीफ़ दे, बराबरी के विकल्पों की तुलना करे और बल्क ऑर्डर देने से पहले सही सैंपल मंज़ूर करे। मुश्किल काम कपड़े की तस्वीरें ढूँढना नहीं है। मुश्किल यह पक्का करना है कि जो कपड़ा दिखाया गया, जो कोटेशन मिला और आख़िर में जो माल आया — तीनों एक ही ज़रूरत की बात कर रहे हों। नीचे दिया तरीक़ा रिटेलरों, ब्रांडों, गारमेंट निर्माताओं और थोक व्यापारियों को सूरत से ज़्यादा साफ़-साफ़ कपड़ा मंगवाने में मदद कर सकता है — तब भी, जब वे दूसरे शहर या देश से खरीद रहे हों।",
      "hi-en":
        "Surat India ke bade textile centres mein se ek hai, lekin yahan se fabric mangwane ke liye har market, mill ya processing unit mein khud jaana zaroori nahi. Kai wholesale requirements remote hi poori ho sakti hain — bashart khareedar clear brief de, barabari ke options compare kare aur bulk order dene se pehle sahi sample approve kare. Mushkil kaam fabric ki photographs dhoondhna nahi hai. Mushkil yeh pakka karna hai ki jo fabric dikhaya gaya, jo quotation mila aur aakhir mein jo maal aaya — teeno ek hi requirement ki baat kar rahe hon. Neeche diya tareeka retailers, brands, garment manufacturers aur wholesalers ko Surat se zyada clear tareeke se fabric mangwane mein madad kar sakta hai — tab bhi, jab wo doosre shahar ya desh se khareed rahe hon.",
    },
    inlineLinks: [
      {
        phrase: {
          en: "a complete fabric specification",
          hi: "पूरा स्पेसिफ़िकेशन",
          "hi-en": "poora specification",
        },
        href: "/blog/how-to-read-a-fabric-spec",
      },
      {
        phrase: {
          en: "widths and price levels",
          hi: "चौड़ाई और कीमत",
          "hi-en": "width aur price",
        },
        href: "/blog/fabric-width-and-costing",
      },
      {
        phrase: {
          en: "from sample to bulk order",
          hi: "सैंपल से बल्क ऑर्डर तक",
          "hi-en": "sample se bulk order tak",
        },
        href: "/blog/sample-to-bulk-order-checklist",
      },
      {
        phrase: {
          en: "buying dress material wholesale",
          hi: "ड्रेस मटेरियल थोक में खरीदने",
          "hi-en": "dress material wholesale mein khareedne",
        },
        href: "/blog/buying-dress-material-wholesale",
      },
      {
        phrase: {
          en: "our fabric range",
          hi: "हमारी फैब्रिक रेंज",
          "hi-en": "hamari fabric range",
        },
        href: "/#catalogue",
      },
    ],
    related: ["sample-to-bulk-order-checklist", "buying-dress-material-wholesale"],
    sections: [
      {
        heading: {
          en: "Start with a buying brief, not a catalogue request",
          hi: "कैटलॉग माँगने से पहले खरीद की ब्रीफ़ बनाइए",
          "hi-en": "Catalogue maangne se pehle buying brief banaiye",
        },
        paragraphs: {
          en: [
            "A message asking for “cotton fabric,” “something premium” or “the latest collection” leaves too much open to interpretation. Surat’s textile ecosystem covers a wide range of fibres, constructions, finishes, widths and price levels. The same broad fabric name may describe several materially different products.",
            "Before contacting a supplier, prepare a short buying brief containing the information you already know.",
            "You do not need to know every technical term. Explain the intended use and identify which characteristics are essential. A supplier can make a better recommendation when they understand whether the fabric is intended for sarees, dress materials, kurtis, shirts, occasionwear, uniforms or another application.",
            "A useful enquiry might say: “We need a soft printed fabric for an everyday women’s garment range. The material should have good drape and should not be highly transparent. Our first requirement is approximately 500 metres across four designs, for delivery to Jaipur. Please suggest suitable options and provide the available width, GSM, MOQ and dispatch estimate.” That brief gives the supplier something specific to work with.",
          ],
          hi: [
            "“कॉटन फैब्रिक”, “कुछ प्रीमियम” या “नई कलेक्शन” माँगने वाला मैसेज बहुत कुछ अंदाज़े पर छोड़ देता है। सूरत के टेक्सटाइल कारोबार में रेशों, बुनावट, फ़िनिश, चौड़ाई और कीमत के कई स्तर हैं। एक ही आम नाम से कई ऐसे प्रोडक्ट बताए जा सकते हैं जो असल में एक-दूसरे से काफ़ी अलग हों।",
            "सप्लायर से बात करने से पहले एक छोटी खरीद-ब्रीफ़ तैयार कीजिए, जिसमें वह जानकारी हो जो आपको पहले से पता है।",
            "हर तकनीकी शब्द जानना ज़रूरी नहीं। यह बताइए कि कपड़ा किस काम के लिए है और कौन-सी बातें ज़रूरी हैं। जब सप्लायर को पता हो कि कपड़ा साड़ियों, ड्रेस मटेरियल, कुर्तियों, शर्ट, ओकेज़नवियर, यूनिफ़ॉर्म या किसी और काम के लिए है, तो वह बेहतर सुझाव दे सकता है।",
            "एक काम की पूछताछ ऐसी हो सकती है: “हमें रोज़ पहनने वाली महिलाओं की रेंज के लिए मुलायम प्रिंटेड कपड़ा चाहिए। उसका ड्रेप अच्छा हो और वह बहुत पारदर्शी न हो। पहली ज़रूरत चार डिज़ाइनों में करीब 500 मीटर है, डिलीवरी जयपुर। कृपया सही विकल्प सुझाइए और उपलब्ध चौड़ाई, GSM, MOQ और डिस्पैच का अनुमान बताइए।” इतनी ब्रीफ़ से सप्लायर को ठोस बात मिल जाती है।",
          ],
          "hi-en": [
            "“Cotton fabric”, “kuch premium” ya “nayi collection” maangne wala message bahut kuch andaaze par chhod deta hai. Surat ke textile karobar mein fibres, construction, finish, width aur price ke kai levels hain. Ek hi aam naam se kai aise products bataye ja sakte hain jo asal mein ek doosre se kaafi alag hon.",
            "Supplier se baat karne se pehle ek chhoti buying brief taiyar kijiye, jisme wo information ho jo aapko pehle se pata hai.",
            "Har technical term jaanna zaroori nahi. Yeh bataiye ki fabric kis kaam ke liye hai aur kaun si baatein zaroori hain. Jab supplier ko pata ho ki fabric sarees, dress material, kurtis, shirts, occasionwear, uniforms ya kisi aur kaam ke liye hai, to wo behtar suggestion de sakta hai.",
            "Ek kaam ki enquiry aisi ho sakti hai: “Humein roz pehanne wali women’s range ke liye mulayam printed fabric chahiye. Uska drape achha ho aur wo bahut transparent na ho. Pehli requirement chaar designs mein kareeb 500 metre hai, delivery Jaipur. Kripya sahi options suggest kijiye aur available width, GSM, MOQ aur dispatch ka estimate bataiye.” Itni brief se supplier ko thos baat mil jaati hai.",
          ],
        },
        checklist: {
          en: [
            "The finished product you intend to make or sell",
            "Your preferred fibre or fabric category",
            "The feel, drape, weight or appearance you require",
            "Whether the material should be plain, printed, dyed, woven or embellished",
            "Preferred colours, patterns or reference designs",
            "Required width or GSM, where applicable",
            "Approximate order quantity",
            "Delivery city or country",
            "Required arrival date",
            "Your workable buying range, if you have one",
          ],
          hi: [
            "जो तैयार प्रोडक्ट आप बनाना या बेचना चाहते हैं",
            "आपका पसंदीदा रेशा या कपड़े की श्रेणी",
            "आपको कैसा फ़ील, ड्रेप, वज़न या रूप चाहिए",
            "कपड़ा प्लेन, प्रिंटेड, रंगा हुआ, बुना हुआ या कढ़ाई वाला हो",
            "पसंदीदा रंग, पैटर्न या रेफ़रेंस डिज़ाइन",
            "ज़रूरी चौड़ाई या GSM, जहाँ लागू हो",
            "ऑर्डर की अनुमानित मात्रा",
            "डिलीवरी का शहर या देश",
            "माल पहुँचने की ज़रूरी तारीख़",
            "आपकी चल सकने वाली खरीद रेंज, अगर तय है",
          ],
          "hi-en": [
            "Jo finished product aap banana ya bechna chahte hain",
            "Aapka pasandeeda fibre ya fabric category",
            "Aapko kaisa feel, drape, weight ya look chahiye",
            "Fabric plain, printed, dyed, woven ya embellished ho",
            "Pasandeeda colours, patterns ya reference designs",
            "Zaroori width ya GSM, jahan lagu ho",
            "Order ki approximate quantity",
            "Delivery ka city ya country",
            "Maal pahunchne ki zaroori date",
            "Aapki chal sakne wali buying range, agar tay hai",
          ],
        },
      },
      {
        heading: {
          en: "Use photographs as references, not specifications",
          hi: "तस्वीरों को रेफ़रेंस मानिए, स्पेसिफ़िकेशन नहीं",
          "hi-en": "Photographs ko reference maaniye, specification nahi",
        },
        paragraphs: {
          en: [
            "A reference photograph is useful for communicating colour, texture, print scale or the overall look you want. It is not a complete fabric specification.",
            "Lighting, photography, editing and screen settings can change the way a fabric appears. Two materials may look similar in a photograph while differing in composition, weight, construction, finish or performance.",
            "When sending a photograph, explain what you want the supplier to match. For example: “We like the colour family, but the exact print can change.” “The drape and transparency are more important than the colour.” “We need a similar woven texture in a lighter weight.” “The motif must be approximately this size.” “The fabric will be used for a washable everyday garment.”",
            "If you already have a physical swatch, ask whether you can send it for evaluation. Record any code attached to the swatch so that later quotations and samples can be connected to the correct reference.",
          ],
          hi: [
            "रेफ़रेंस तस्वीर रंग, बनावट, प्रिंट के आकार या पूरे लुक को समझाने के लिए काम की है। वह कपड़े का पूरा स्पेसिफ़िकेशन नहीं होती।",
            "रोशनी, फ़ोटोग्राफ़ी, एडिटिंग और स्क्रीन की सेटिंग कपड़े के दिखने का तरीक़ा बदल देती हैं। दो कपड़े तस्वीर में एक जैसे लग सकते हैं, पर सामग्री, वज़न, बुनावट, फ़िनिश या टिकाऊपन में अलग हो सकते हैं।",
            "तस्वीर भेजते समय बताइए कि सप्लायर को किस बात से मिलाना है। जैसे: “रंग का परिवार पसंद है, पर प्रिंट बदल सकता है।” “रंग से ज़्यादा ज़रूरी ड्रेप और पारदर्शिता है।” “ऐसी ही बुनावट, पर हल्के वज़न में चाहिए।” “मोटिफ़ का आकार करीब इतना ही हो।” “कपड़ा रोज़ पहनने और धोने वाले कपड़े के लिए है।”",
            "अगर आपके पास असली स्वैच है, तो पूछिए कि उसे जाँच के लिए भेज सकते हैं या नहीं। स्वैच पर लगा कोड लिख लीजिए, ताकि आगे के कोटेशन और सैंपल सही रेफ़रेंस से जुड़े रहें।",
          ],
          "hi-en": [
            "Reference photograph colour, texture, print ke size ya poore look ko samjhane ke liye kaam ki hai. Wo fabric ka poora specification nahi hoti.",
            "Lighting, photography, editing aur screen ki settings fabric ke dikhne ka tareeka badal deti hain. Do fabric photograph mein ek jaise lag sakte hain, par composition, weight, construction, finish ya performance mein alag ho sakte hain.",
            "Photograph bhejte samay bataiye ki supplier ko kis baat se match karna hai. Jaise: “Colour family pasand hai, par print badal sakta hai.” “Colour se zyada zaroori drape aur transparency hai.” “Aisi hi woven texture, par halke weight mein chahiye.” “Motif ka size kareeb itna hi ho.” “Fabric roz pehanne aur dhone wale garment ke liye hai.”",
            "Agar aapke paas asli swatch hai, to poochiye ki use evaluation ke liye bhej sakte hain ya nahi. Swatch par laga code likh lijiye, taaki aage ke quotations aur samples sahi reference se jude rahein.",
          ],
        },
      },
      {
        heading: {
          en: "Ask for fabric options that can be compared properly",
          hi: "ऐसे विकल्प माँगिए जिनकी ठीक से तुलना हो सके",
          "hi-en": "Aise options maangiye jinki theek se comparison ho sake",
        },
        paragraphs: {
          en: [
            "Once the requirement is clear, the supplier should be able to shortlist relevant alternatives instead of sending an unfiltered collection of photographs. Ask for the same basic information for every shortlisted option.",
            "Put the options side by side. A lower quote may refer to a different width, weight, finish, quantity or delivery term. Comparing only the price per metre can therefore produce the wrong conclusion.",
            "Mark missing information as unknown and ask for clarification. Do not fill the gaps with assumptions based on a photograph or product name.",
          ],
          hi: [
            "ज़रूरत साफ़ हो जाने पर सप्लायर को बिना छाने तस्वीरों का ढेर भेजने के बजाय काम के विकल्प छाँटकर देने चाहिए। हर छँटे हुए विकल्प के लिए एक जैसी बुनियादी जानकारी माँगिए।",
            "विकल्पों को आमने-सामने रखकर देखिए। कम कीमत वाला कोटेशन किसी दूसरी चौड़ाई, वज़न, फ़िनिश, मात्रा या डिलीवरी शर्त का हो सकता है। इसलिए सिर्फ़ प्रति मीटर कीमत देखकर तुलना करने से ग़लत नतीजा निकल सकता है।",
            "जो जानकारी न मिले, उसे “पता नहीं” लिखकर साफ़ कीजिए और पूछिए। तस्वीर या प्रोडक्ट के नाम के आधार पर अंदाज़े से खाली जगह न भरिए।",
          ],
          "hi-en": [
            "Requirement clear ho jaane par supplier ko bina chhane photographs ka dher bhejne ke bajaye kaam ke options shortlist karke dene chahiye. Har shortlisted option ke liye ek jaisi basic information maangiye.",
            "Options ko aamne saamne rakhkar dekhiye. Kam price wala quotation kisi doosri width, weight, finish, quantity ya delivery term ka ho sakta hai. Isliye sirf per metre price dekhkar comparison karne se galat nateeja nikal sakta hai.",
            "Jo information na mile, use “pata nahi” likhkar clear kijiye aur poochiye. Photograph ya product ke naam ke aadhar par andaaze se khaali jagah na bhariye.",
          ],
        },
        checklist: {
          en: [
            "Product or sample code",
            "Stated fibre composition",
            "Fabric construction",
            "GSM or approximate weight",
            "Full width and usable width",
            "Available colours or designs",
            "Finish or surface treatment",
            "Whether it is ready stock or requires production",
            "MOQ and how the MOQ is calculated",
            "Unit of sale, such as metres, pieces, sets or rolls",
            "Price basis",
            "Sample availability",
            "Estimated dispatch timeline",
          ],
          hi: [
            "प्रोडक्ट या सैंपल कोड",
            "बताई गई रेशे की सामग्री",
            "कपड़े की बुनावट",
            "GSM या अनुमानित वज़न",
            "पूरी चौड़ाई और इस्तेमाल लायक चौड़ाई",
            "उपलब्ध रंग या डिज़ाइन",
            "फ़िनिश या सतह का उपचार",
            "माल तैयार स्टॉक में है या बनवाना पड़ेगा",
            "MOQ, और MOQ किस तरह गिना जाता है",
            "बिक्री की इकाई — मीटर, पीस, सेट या रोल",
            "कीमत किस आधार पर है",
            "सैंपल मिल सकता है या नहीं",
            "डिस्पैच का अनुमानित समय",
          ],
          "hi-en": [
            "Product ya sample code",
            "Batayi gayi fibre composition",
            "Fabric construction",
            "GSM ya approximate weight",
            "Poori width aur usable width",
            "Available colours ya designs",
            "Finish ya surface treatment",
            "Maal ready stock mein hai ya banwana padega",
            "MOQ, aur MOQ kis tarah gina jaata hai",
            "Bikri ki unit — metre, piece, set ya roll",
            "Price kis aadhar par hai",
            "Sample mil sakta hai ya nahi",
            "Dispatch ka approximate time",
          ],
        },
      },
      {
        heading: {
          en: "Approve a physical sample before the bulk order",
          hi: "बल्क ऑर्डर से पहले असली सैंपल मंज़ूर कीजिए",
          "hi-en": "Bulk order se pehle asli sample approve kijiye",
        },
        paragraphs: {
          en: [
            "A physical sample helps answer questions that photographs cannot. Depending on the application, examine the feel and drape, weight and thickness, transparency, colour under ordinary lighting, print or motif scale, surface texture, usable width, stretch and recovery, and the finishing and edge quality.",
            "If shrinkage, colourfastness or another performance characteristic is important, communicate the requirement before ordering. Ask what testing or supporting information is available. Appearance alone cannot establish how a material will perform during cutting, stitching, washing or regular use.",
            "A sample approved with a change in colour, width or finish is not an unconditional approval. Confirm how the revised version will be checked before bulk production or dispatch. For additional checks, work through our guide from sample to bulk order.",
          ],
          hi: [
            "असली सैंपल उन सवालों के जवाब देता है जो तस्वीर नहीं दे सकती। काम के हिसाब से देखिए — फ़ील और ड्रेप, वज़न और मोटाई, पारदर्शिता, आम रोशनी में रंग, प्रिंट या मोटिफ़ का आकार, सतह की बनावट, इस्तेमाल लायक चौड़ाई, खिंचाव और वापस लौटना, और फ़िनिशिंग व किनारों की सफ़ाई।",
            "अगर सिकुड़न, रंग की पक्कापन या कोई और गुण ज़रूरी है, तो ऑर्डर से पहले यह बात कह दीजिए। पूछिए कि कौन-सी जाँच या सहायक जानकारी उपलब्ध है। सिर्फ़ देखने से यह तय नहीं होता कि कटाई, सिलाई, धुलाई और रोज़ इस्तेमाल में कपड़ा कैसा निकलेगा।",
            "रंग, चौड़ाई या फ़िनिश में बदलाव की शर्त पर मंज़ूर किया गया सैंपल बिना शर्त मंज़ूरी नहीं है। पक्का कीजिए कि बल्क बनने या डिस्पैच से पहले बदला हुआ रूप कैसे जाँचा जाएगा। आगे की जाँच के लिए हमारी गाइड सैंपल से बल्क ऑर्डर तक देखिए।",
          ],
          "hi-en": [
            "Asli sample un sawaalon ke jawab deta hai jo photograph nahi de sakti. Kaam ke hisaab se dekhiye — feel aur drape, weight aur thickness, transparency, aam roshni mein colour, print ya motif ka size, surface texture, usable width, stretch aur recovery, aur finishing va edges ki safai.",
            "Agar shrinkage, colourfastness ya koi aur performance zaroori hai, to order se pehle yeh baat keh deejiye. Poochiye ki kaun si testing ya supporting information available hai. Sirf dekhne se yeh tay nahi hota ki cutting, stitching, dhulai aur roz istemal mein fabric kaisa niklega.",
            "Colour, width ya finish mein badlav ki shart par approve kiya gaya sample bina shart approval nahi hai. Pakka kijiye ki bulk banne ya dispatch se pehle badla hua roop kaise jaancha jayega. Aage ki checks ke liye hamari guide sample se bulk order tak dekhiye.",
          ],
        },
        checklist: {
          en: [
            "The sample code",
            "Photographs of the approved sample",
            "The approval date",
            "The agreed specification",
            "Any requested changes",
            "The name or code used in the supplier’s quotation",
          ],
          hi: [
            "सैंपल कोड",
            "मंज़ूर सैंपल की तस्वीरें",
            "मंज़ूरी की तारीख़",
            "तय स्पेसिफ़िकेशन",
            "माँगे गए कोई भी बदलाव",
            "सप्लायर के कोटेशन में लिखा नाम या कोड",
          ],
          "hi-en": [
            "Sample code",
            "Approved sample ki photographs",
            "Approval ki date",
            "Tay specification",
            "Maange gaye koi bhi changes",
            "Supplier ke quotation mein likha naam ya code",
          ],
        },
      },
      {
        heading: {
          en: "Confirm the complete commercial quotation",
          hi: "पूरा व्यापारिक कोटेशन पक्का कीजिए",
          "hi-en": "Poora commercial quotation pakka kijiye",
        },
        paragraphs: {
          en: [
            "The fabric price is only one part of the buying decision. Before paying, ask for a written quotation or order summary containing the full commercial terms.",
            "Check whether the MOQ applies per colour, per design, per roll or across the full order. Also confirm whether the quoted price depends on purchasing the entire assortment.",
            "Vidhi Fabrics, as manufacturer and wholesaler, is responsible for helping you understand the available options, the quotation and the order. We manufacture some lines in-house, and our network of Surat mills, manufacturers and processors supports the rest behind the scenes; you should not have to coordinate separately with every participant.",
            "When sourcing dress materials, you can also use our guide to buying dress material wholesale, or start from our fabric range.",
          ],
          hi: [
            "कपड़े की कीमत खरीद के फ़ैसले का एक हिस्सा भर है। पैसे देने से पहले लिखित कोटेशन या ऑर्डर का सारांश माँगिए, जिसमें पूरी व्यापारिक शर्तें हों।",
            "देखिए कि MOQ हर रंग पर, हर डिज़ाइन पर, हर रोल पर या पूरे ऑर्डर पर लागू है। यह भी पक्का कीजिए कि बताई गई कीमत पूरी रेंज खरीदने पर टिकी है या नहीं।",
            "निर्माता और थोक विक्रेता के रूप में, विधि फैब्रिक्स की ज़िम्मेदारी आपको उपलब्ध विकल्प, कोटेशन और ऑर्डर समझाने की है। कुछ लाइनें हम खुद बनाते हैं, और बाकी सप्लाई सूरत की मिलों, निर्माताओं और प्रोसेसरों का हमारा नेटवर्क पीछे रहकर सँभालता है; आपको हर एक से अलग-अलग तालमेल नहीं बिठाना पड़ता।",
            "ड्रेस मटेरियल मंगवाते समय आप ड्रेस मटेरियल थोक में खरीदने की हमारी गाइड भी देख सकते हैं, या हमारी फैब्रिक रेंज से शुरू कर सकते हैं।",
          ],
          "hi-en": [
            "Fabric ki price khareed ke faisle ka ek hissa bhar hai. Paise dene se pehle likhit quotation ya order ka summary maangiye, jisme poori commercial terms hon.",
            "Dekhiye ki MOQ har colour par, har design par, har roll par ya poore order par lagu hai. Yeh bhi pakka kijiye ki batayi gayi price poori range khareedne par tiki hai ya nahi.",
            "Vidhi Fabrics manufacturer aur wholesaler ke roop mein aapko available options, quotation aur order samjhane ki zimmedari leta hai. Kuch lines hum khud banate hain, aur baaki supply Surat ki mills, manufacturers aur processors ka hamara network peeche rehkar sambhalta hai; aapko har ek se alag alag taalmel nahi bithana padta.",
            "Dress material mangwate samay aap dress material wholesale mein khareedne ki hamari guide bhi dekh sakte hain, ya hamari fabric range se shuru kar sakte hain.",
          ],
        },
        checklist: {
          en: [
            "Product and sample codes",
            "Quantities by colour, design or variant",
            "Unit of sale",
            "Price and applicable taxes",
            "Packing charges",
            "Freight or delivery responsibility",
            "Payment stages",
            "Stock or production status",
            "Estimated dispatch date",
            "Rules for substitutions or quantity changes",
            "Process for reporting shortages, damage or incorrect material",
          ],
          hi: [
            "प्रोडक्ट और सैंपल कोड",
            "रंग, डिज़ाइन या वैरिएंट के हिसाब से मात्रा",
            "बिक्री की इकाई",
            "कीमत और लागू कर",
            "पैकिंग का ख़र्च",
            "भाड़ा या डिलीवरी की ज़िम्मेदारी",
            "भुगतान के चरण",
            "स्टॉक या उत्पादन की स्थिति",
            "डिस्पैच की अनुमानित तारीख़",
            "बदलाव या मात्रा में फेरबदल के नियम",
            "कम माल, नुक़सान या ग़लत माल की शिकायत का तरीक़ा",
          ],
          "hi-en": [
            "Product aur sample codes",
            "Colour, design ya variant ke hisaab se quantity",
            "Bikri ki unit",
            "Price aur lagu taxes",
            "Packing ka kharch",
            "Freight ya delivery ki zimmedari",
            "Payment ke stages",
            "Stock ya production ki sthiti",
            "Dispatch ki approximate date",
            "Substitution ya quantity mein farebadal ke rules",
            "Kam maal, damage ya galat maal ki complaint ka tareeka",
          ],
        },
      },
      {
        heading: {
          en: "Separate the dispatch date from the arrival date",
          hi: "डिस्पैच की तारीख़ और पहुँचने की तारीख़ अलग रखिए",
          "hi-en": "Dispatch ki date aur pahunchne ki date alag rakhiye",
        },
        paragraphs: {
          en: [
            "“Ready in ten days” can refer to production completion, dispatch or delivery. These are not the same milestone. Tell the supplier the date by which the material must arrive — not only when you expect it to leave Surat.",
            "Transport time can vary by destination and shipment type. If the fabric is needed for a launch, festive season or customer order, include reasonable time for receiving, inspecting and resolving any concern before cutting begins.",
          ],
          hi: [
            "“दस दिन में तैयार” का मतलब उत्पादन पूरा होना, डिस्पैच या डिलीवरी — कुछ भी हो सकता है। ये एक ही पड़ाव नहीं हैं। सप्लायर को वह तारीख़ बताइए जिस तक माल पहुँच जाना चाहिए, सिर्फ़ यह नहीं कि वह सूरत से कब निकलेगा।",
            "गंतव्य और भेजने के तरीक़े से ट्रांसपोर्ट का समय बदलता है। अगर कपड़ा किसी लॉन्च, त्योहारी सीज़न या ग्राहक के ऑर्डर के लिए है, तो कटाई शुरू होने से पहले माल लेने, जाँचने और किसी दिक़्क़त को सुलझाने का वाजिब समय भी जोड़िए।",
          ],
          "hi-en": [
            "“Das din mein taiyar” ka matlab production poora hona, dispatch ya delivery — kuch bhi ho sakta hai. Ye ek hi milestone nahi hain. Supplier ko wo date bataiye jis tak maal pahunch jaana chahiye, sirf yeh nahi ki wo Surat se kab niklega.",
            "Destination aur bhejne ke tareeke se transport ka time badalta hai. Agar fabric kisi launch, festive season ya customer ke order ke liye hai, to cutting shuru hone se pehle maal lene, jaanchne aur kisi dikkat ko suljhane ka waajib time bhi jodiye.",
          ],
        },
        checklist: {
          en: [
            "Expected production or preparation completion",
            "Estimated dispatch date",
            "Transport method",
            "Delivery destination and receiving contact",
            "Shipment or tracking information",
            "Whether partial shipments are possible",
            "How delays or stock changes will be communicated",
          ],
          hi: [
            "उत्पादन या तैयारी पूरी होने का अनुमान",
            "डिस्पैच की अनुमानित तारीख़",
            "भेजने का तरीक़ा",
            "डिलीवरी की जगह और माल लेने वाले का संपर्क",
            "शिपमेंट या ट्रैकिंग की जानकारी",
            "माल किश्तों में भेजा जा सकता है या नहीं",
            "देरी या स्टॉक में बदलाव की सूचना कैसे मिलेगी",
          ],
          "hi-en": [
            "Production ya taiyari poori hone ka anumaan",
            "Dispatch ki approximate date",
            "Bhejne ka tareeka",
            "Delivery ki jagah aur maal lene wale ka contact",
            "Shipment ya tracking ki information",
            "Maal kishton mein bheja ja sakta hai ya nahi",
            "Deri ya stock mein badlav ki soochna kaise milegi",
          ],
        },
      },
      {
        heading: {
          en: "Create a record for repeat orders",
          hi: "दोबारा ऑर्डर के लिए रिकॉर्ड बनाइए",
          "hi-en": "Dobara order ke liye record banaiye",
        },
        paragraphs: {
          en: [
            "The first order should also create the information needed for the second order. Keep the approved sample, quotation, invoice and delivery observations together.",
            "Record what was ordered, what was received, customer or production feedback, whether the colour and finish met expectations, whether the material was easy to cut or sell, which designs moved quickly, which products remained unsold, and whether the item should be reordered.",
            "For a repeat order, provide the original code and ask whether the material is from the same stock or a new production batch. Where shade or finish consistency matters, discuss how the new supply will be compared with the earlier reference.",
            "A clear commercial history makes future sourcing faster and reduces dependence on scattered photographs and chat messages.",
          ],
          hi: [
            "पहला ऑर्डर दूसरे ऑर्डर के लिए ज़रूरी जानकारी भी बना देना चाहिए। मंज़ूर सैंपल, कोटेशन, बिल और डिलीवरी के दौरान की बातें एक जगह रखिए।",
            "लिखिए कि क्या ऑर्डर किया, क्या मिला, ग्राहक या उत्पादन से क्या फ़ीडबैक आया, रंग और फ़िनिश उम्मीद पर उतरे या नहीं, कपड़ा काटने या बेचने में आसान रहा या नहीं, कौन-से डिज़ाइन जल्दी बिके, कौन-से प्रोडक्ट बचे रह गए, और यह माल दोबारा मंगवाना चाहिए या नहीं।",
            "दोबारा ऑर्डर करते समय पुराना कोड दीजिए और पूछिए कि माल उसी स्टॉक का है या नए बैच का। जहाँ शेड या फ़िनिश एक जैसा रहना ज़रूरी है, वहाँ बात कीजिए कि नया माल पुराने रेफ़रेंस से कैसे मिलाया जाएगा।",
            "साफ़ व्यापारिक रिकॉर्ड आगे की सोर्सिंग तेज़ करता है और बिखरी तस्वीरों और चैट मैसेजों पर निर्भरता घटाता है।",
          ],
          "hi-en": [
            "Pehla order doosre order ke liye zaroori information bhi bana dena chahiye. Approved sample, quotation, bill aur delivery ke dauran ki baatein ek jagah rakhiye.",
            "Likhiye ki kya order kiya, kya mila, customer ya production se kya feedback aaya, colour aur finish ummeed par utre ya nahi, fabric kaatne ya bechne mein aasan raha ya nahi, kaun se designs jaldi bike, kaun se products bache reh gaye, aur yeh maal dobara mangwana chahiye ya nahi.",
            "Dobara order karte samay purana code deejiye aur poochiye ki maal usi stock ka hai ya naye batch ka. Jahan shade ya finish ek jaisa rehna zaroori hai, wahan baat kijiye ki naya maal purane reference se kaise milaya jayega.",
            "Saaf commercial record aage ki sourcing tez karta hai aur bikhri photographs aur chat messages par nirbharta ghatata hai.",
          ],
        },
      },
    ],
    closing: {
      heading: {
        en: "Remote fabric-sourcing checklist",
        hi: "दूर बैठे कपड़ा मंगवाने की चेकलिस्ट",
        "hi-en": "Remote fabric sourcing ki checklist",
      },
      intro: {
        en: "Before confirming an order from Surat, make sure you have covered each of the following. Remote sourcing works best when each decision is recorded. The objective is not simply to receive more options. It is to move from requirement to sample, quotation, bulk order and delivery without losing the details approved along the way.",
        hi: "सूरत से ऑर्डर पक्का करने से पहले देख लीजिए कि नीचे की हर बात हो चुकी है। दूर बैठे सोर्सिंग तब सबसे अच्छी चलती है जब हर फ़ैसला लिखा जाए। मक़सद ज़्यादा विकल्प पाना नहीं है। मक़सद यह है कि ज़रूरत से सैंपल, कोटेशन, बल्क ऑर्डर और डिलीवरी तक पहुँचते हुए रास्ते में मंज़ूर की गई बातें छूट न जाएँ।",
        "hi-en":
          "Surat se order pakka karne se pehle dekh lijiye ki neeche ki har baat ho chuki hai. Remote sourcing tab sabse achhi chalti hai jab har faisla likha jaye. Maqsad zyada options paana nahi hai. Maqsad yeh hai ki requirement se sample, quotation, bulk order aur delivery tak pahunchte hue raaste mein approve ki gayi baatein chhoot na jayein.",
      },
      checklist: {
        en: [
          "Defined the fabric’s intended use",
          "Shared the quantity and delivery location",
          "Explained what matters in any reference photograph",
          "Received comparable product specifications",
          "Confirmed the MOQ basis",
          "Reviewed or approved a sample",
          "Saved the approved product code",
          "Confirmed taxes, packing and freight",
          "Distinguished dispatch from delivery",
          "Agreed how changes and problems will be reported",
          "Prepared a receiving and inspection process",
        ],
        hi: [
          "कपड़ा किस काम के लिए है, यह तय किया",
          "मात्रा और डिलीवरी की जगह बताई",
          "रेफ़रेंस तस्वीर में क्या ज़रूरी है, यह समझाया",
          "तुलना लायक प्रोडक्ट स्पेसिफ़िकेशन मिले",
          "MOQ किस आधार पर है, यह पक्का किया",
          "सैंपल देखा या मंज़ूर किया",
          "मंज़ूर प्रोडक्ट कोड सँभालकर रखा",
          "कर, पैकिंग और भाड़ा पक्का किया",
          "डिस्पैच और डिलीवरी में फ़र्क़ साफ़ किया",
          "बदलाव और दिक़्क़तों की शिकायत का तरीक़ा तय किया",
          "माल लेने और जाँचने की तैयारी की",
        ],
        "hi-en": [
          "Fabric kis kaam ke liye hai, yeh tay kiya",
          "Quantity aur delivery ki jagah batayi",
          "Reference photograph mein kya zaroori hai, yeh samjhaya",
          "Comparison layak product specifications mile",
          "MOQ kis aadhar par hai, yeh pakka kiya",
          "Sample dekha ya approve kiya",
          "Approved product code sambhaal kar rakha",
          "Taxes, packing aur freight pakka kiya",
          "Dispatch aur delivery mein farq saaf kiya",
          "Changes aur dikkaton ki complaint ka tareeka tay kiya",
          "Maal lene aur jaanchne ki taiyari ki",
        ],
      },
    },
    faq: [
      {
        question: {
          en: "Can I source fabric from Surat without visiting in person?",
          hi: "क्या मैं ख़ुद जाए बिना सूरत से कपड़ा मंगवा सकता/सकती हूँ?",
          "hi-en": "Kya main khud jaaye bina Surat se fabric mangwa sakta/sakti hoon?",
        },
        answer: {
          en: "Many wholesale fabric requirements can be managed remotely when the buyer provides a clear requirement, reviews comparable specifications, approves a representative sample and confirms the commercial terms in writing. A visit may still be useful for complex development work or when physical comparison of many options is essential.",
          hi: "कई थोक ज़रूरतें दूर बैठे सँभाली जा सकती हैं — बशर्ते खरीदार साफ़ ज़रूरत बताए, तुलना लायक स्पेसिफ़िकेशन देखे, प्रतिनिधि सैंपल मंज़ूर करे और व्यापारिक शर्तें लिखित में पक्की करे। जटिल डेवलपमेंट के काम में, या जब बहुत सारे विकल्प हाथ में लेकर देखना ज़रूरी हो, तब जाना फिर भी काम आ सकता है।",
          "hi-en":
            "Kai wholesale requirements remote sambhali ja sakti hain — bashart khareedar saaf requirement bataye, comparison layak specifications dekhe, representative sample approve kare aur commercial terms likhit mein pakki kare. Complex development ke kaam mein, ya jab bahut saare options haath mein lekar dekhna zaroori ho, tab jaana phir bhi kaam aa sakta hai.",
        },
      },
      {
        question: {
          en: "What information should I send to a Surat fabric supplier?",
          hi: "सूरत के कपड़ा सप्लायर को कौन-सी जानकारी भेजनी चाहिए?",
          "hi-en": "Surat ke fabric supplier ko kaun si information bhejni chahiye?",
        },
        answer: {
          en: "Send the intended application, preferred fabric or fibre, required feel or appearance, colour or design references, width or GSM requirements, approximate quantity, delivery location and required arrival date.",
          hi: "कपड़ा किस काम के लिए है, पसंदीदा कपड़ा या रेशा, कैसा फ़ील या रूप चाहिए, रंग या डिज़ाइन के रेफ़रेंस, चौड़ाई या GSM की ज़रूरत, अनुमानित मात्रा, डिलीवरी की जगह और पहुँचने की ज़रूरी तारीख़ भेजिए।",
          "hi-en":
            "Fabric kis kaam ke liye hai, pasandeeda fabric ya fibre, kaisa feel ya look chahiye, colour ya design ke references, width ya GSM ki zaroorat, approximate quantity, delivery ki jagah aur pahunchne ki zaroori date bhejiye.",
        },
      },
      {
        question: {
          en: "Should I request a sample before placing a wholesale order?",
          hi: "थोक ऑर्डर देने से पहले सैंपल माँगना चाहिए?",
          "hi-en": "Wholesale order dene se pehle sample maangna chahiye?",
        },
        answer: {
          en: "A sample is advisable when fabric feel, drape, transparency, colour, construction or performance affects the buying decision. Confirm whether the sample represents ready stock or proposed bulk production.",
          hi: "जब कपड़े का फ़ील, ड्रेप, पारदर्शिता, रंग, बुनावट या टिकाऊपन खरीद के फ़ैसले पर असर डालता हो, तब सैंपल लेना ठीक रहता है। यह पक्का कीजिए कि सैंपल तैयार स्टॉक का है या आगे बनने वाले बल्क का।",
          "hi-en":
            "Jab fabric ka feel, drape, transparency, colour, construction ya performance khareed ke faisle par asar daalta ho, tab sample lena theek rehta hai. Yeh pakka kijiye ki sample ready stock ka hai ya aage banne wale bulk ka.",
        },
      },
      {
        question: {
          en: "How does fabric MOQ work?",
          hi: "कपड़े का MOQ कैसे चलता है?",
          "hi-en": "Fabric ka MOQ kaise chalta hai?",
        },
        answer: {
          en: "MOQ may apply per colour, design, roll, product or total order. Buyers should ask the supplier to explain exactly how the minimum quantity is calculated before comparing quotations.",
          hi: "MOQ हर रंग, डिज़ाइन, रोल, प्रोडक्ट या पूरे ऑर्डर पर लागू हो सकता है। कोटेशन की तुलना करने से पहले खरीदार को सप्लायर से पूछ लेना चाहिए कि न्यूनतम मात्रा ठीक किस तरह गिनी जाती है।",
          "hi-en":
            "MOQ har colour, design, roll, product ya poore order par lagu ho sakta hai. Quotations compare karne se pehle khareedar ko supplier se pooch lena chahiye ki minimum quantity theek kis tarah gini jaati hai.",
        },
      },
      {
        question: {
          en: "What should I compare besides the fabric price?",
          hi: "कपड़े की कीमत के अलावा किन बातों की तुलना करनी चाहिए?",
          "hi-en": "Fabric ki price ke alawa kin baaton ki comparison karni chahiye?",
        },
        answer: {
          en: "Compare composition, construction, GSM, width, finish, MOQ, availability, taxes, packing, freight, payment terms, dispatch timing and the process for reporting an incorrect or defective supply.",
          hi: "सामग्री, बुनावट, GSM, चौड़ाई, फ़िनिश, MOQ, उपलब्धता, कर, पैकिंग, भाड़ा, भुगतान की शर्तें, डिस्पैच का समय और ग़लत या ख़राब माल की शिकायत के तरीक़े — इन सबकी तुलना कीजिए।",
          "hi-en":
            "Composition, construction, GSM, width, finish, MOQ, availability, taxes, packing, freight, payment terms, dispatch timing aur galat ya kharab maal ki complaint ke tareeke — in sabki comparison kijiye.",
        },
      },
    ],
    cta: {
      kicker: {
        en: "Your fabric requirement",
        hi: "आपकी कपड़े की ज़रूरत",
        "hi-en": "Aapki fabric requirement",
      },
      heading: {
        en: "Tell us what you need to source from Surat.",
        hi: "बताइए, सूरत से आपको क्या मंगवाना है।",
        "hi-en": "Bataiye, Surat se aapko kya mangwana hai.",
      },
      body: {
        en: "Share the fabric or finished product you are looking for, your approximate quantity and your delivery city. Our team will review the requirement and discuss suitable sourcing options.",
        hi: "आप जो कपड़ा या तैयार प्रोडक्ट ढूँढ रहे हैं, अनुमानित मात्रा और डिलीवरी का शहर बताइए। हमारी टीम ज़रूरत देखकर सही सोर्सिंग विकल्पों पर बात करेगी।",
        "hi-en":
          "Aap jo fabric ya finished product dhoondh rahe hain, approximate quantity aur delivery ka city bataiye. Hamari team requirement dekhkar sahi sourcing options par baat karegi.",
      },
      label: {
        en: "Send your requirement on WhatsApp",
        hi: "व्हाट्सएप पर अपनी ज़रूरत भेजिए",
        "hi-en": "WhatsApp par apni requirement bhejiye",
      },
    },
    whatsAppMessage: {
      en: "Hi Vidhi Fabrics, I read “How to Source Fabric from Surat Without Visiting the Market”. I am looking for [fabric or product], approximately [quantity], for delivery to [city or country].",
      hi: "नमस्ते विधि फैब्रिक्स, मैंने “बाज़ार जाए बिना सूरत से कपड़ा कैसे मंगवाएँ” पढ़ा। मुझे [कपड़ा या प्रोडक्ट] चाहिए, करीब [मात्रा], डिलीवरी [शहर या देश] में।",
      "hi-en":
        "Hi Vidhi Fabrics, maine “Market jaaye bina Surat se fabric kaise mangwayein” padha. Mujhe [fabric ya product] chahiye, kareeb [quantity], delivery [city ya country] mein.",
    },
  },
  {
    slug: "buying-dress-material-wholesale",
    related: ["how-to-read-a-fabric-spec", "why-similar-sarees-have-different-prices"],
    inlineLinks: [
      {
        phrase: {
          en: "stated composition and measurements",
          hi: "बताई गई सामग्री और नाप",
          "hi-en": "batayi gayi composition aur measurements",
        },
        href: "/blog/how-to-read-a-fabric-spec",
      },
      {
        phrase: {
          en: "source fabric from Surat remotely",
          hi: "दूर बैठे सूरत से कपड़ा मंगवा",
          "hi-en": "remote rehkar Surat se fabric mangwa",
        },
        href: "/blog/source-fabric-from-surat",
      },
      {
        phrase: {
          en: "dress material wholesale page",
          hi: "ड्रेस मटेरियल थोक पेज",
          "hi-en": "dress material wholesale page",
        },
        href: "/dress-material-wholesale-surat",
      },
    ],
    image: cotton,
    published: "2026-09-12",
    imageAlt: {
      en: "Cream fabric folded to show its weave and texture",
      hi: "क्रीम रंग का कपड़ा, जिसकी बुनाई और बनावट दिख रही है",
      "hi-en": "Cream fabric jiski weave aur texture dikh rahi hai",
    },
    category: {
      en: "Wholesale buying",
      hi: "थोक खरीद",
      "hi-en": "Wholesale buying",
    },
    /* Shortened for search: the visible title above ~60 characters is
       truncated in results, and the cut falls on the specific term.
       Derived by trimming the display title rather than rewritten, so the
       Hindi is the reviewed-pending wording already on the page. */
    metaTitle: {
      en: "Dress material wholesale: what to check",
      hi: "ड्रेस मटेरियल थोक: पहले यह जाँच लीजिए",
      "hi-en": "Dress material wholesale: kya check karein",
    },
    title: {
      en: "Buying dress material wholesale? Here’s what to check first.",
      hi: "ड्रेस मटेरियल थोक में खरीद रहे हैं? पहले यह जाँच लीजिए।",
      "hi-en": "Dress material wholesale mein khareed rahe hain? Pehle yeh check kar lijiye.",
    },
    excerpt: {
      en: "From fabric details to minimum quantities, know what to ask before placing your first order.",
      hi: "कपड़े की जानकारी से लेकर न्यूनतम मात्रा तक — पहला ऑर्डर देने से पहले क्या पूछना चाहिए।",
      "hi-en":
        "Fabric details se lekar minimum quantity tak — pehla order dene se pehle kya poochna chahiye.",
    },
    directAnswer: {
      en: "Buying dress material wholesale means confirming five things before ordering: the buying brief, exact set composition, a physical sample, how the minimum order quantity is calculated, and the full written order summary — price, taxes, packing and dispatch — before payment.",
      hi: "ड्रेस मटेरियल थोक में खरीदने से पहले पाँच बातें पक्की कर लीजिए: खरीद की ब्रीफ़, सेट की सही सामग्री, एक असली सैंपल, न्यूनतम मात्रा कैसे तय होती है, और भुगतान से पहले पूरा लिखित ऑर्डर सारांश — कीमत, कर, पैकिंग और डिस्पैच।",
      "hi-en":
        "Dress material wholesale mein khareedne se pehle paanch baatein pakki kar lijiye: buying brief, set ki sahi composition, ek asli sample, minimum quantity kaise tay hoti hai, aur payment se pehle poora likhit order summary — price, taxes, packing aur dispatch.",
    },
    introduction: {
      en: "A useful wholesale enquiry starts with the customer you are buying for. Before choosing a catalogue, write down the type of shop you run, the price range your customers usually buy, and the occasions you want to serve. This gives your supplier a clearer brief and gives you a better way to judge the options. Use the following checks to turn an attractive product photograph into an order you understand.",
      hi: "अच्छी थोक पूछताछ की शुरुआत उस ग्राहक से होती है जिसके लिए आप खरीद रहे हैं। कैटलॉग चुनने से पहले लिख लीजिए कि आपकी दुकान किस तरह की है, आपके ग्राहक आमतौर पर किस कीमत पर खरीदते हैं, और आप किन मौकों के लिए सामान रखना चाहते हैं। इससे सप्लायर को साफ़ ब्रीफ़ मिलता है और आपको विकल्प परखने का बेहतर तरीक़ा। नीचे दी गई जाँचें एक आकर्षक तस्वीर को ऐसे ऑर्डर में बदलने में मदद करती हैं जिसे आप समझते हों।",
      "hi-en":
        "Achhi wholesale enquiry ki shuruaat us customer se hoti hai jiske liye aap khareed rahe hain. Catalogue choose karne se pehle likh lijiye ki aapki shop kis type ki hai, aapke customers aam taur par kis price range mein khareedte hain, aur aap kin occasions ke liye stock rakhna chahte hain. Isse supplier ko clear brief milta hai aur aapko options judge karne ka behtar tareeka. Neeche di gayi checks ek attractive photograph ko aise order mein badalne mein madad karti hain jise aap samajhte hon.",
    },
    sections: [
      {
        heading: {
          en: "Start with a buying brief",
          hi: "खरीद की ब्रीफ़ से शुरू कीजिए",
          "hi-en": "Buying brief se shuru kijiye",
        },
        paragraphs: {
          en: [
            "Decide whether you need everyday dress material, a festive selection, or something for a particular customer request. Include your delivery city, approximate quantity and required arrival date. If you have a reference image, explain what you like about it: the colour, print, texture or overall look. A reference alone does not tell a supplier which details are essential.",
            "Separate your preferred buying price from your intended selling price. Ask what is included in the quotation before comparing it with another offer. A short written brief is easier to revisit than a long series of disconnected messages.",
            "If you are buying from another city or country, the same brief is what lets you source fabric from Surat remotely, without travelling to the market to see each option in person.",
          ],
          hi: [
            "तय कीजिए कि आपको रोज़मर्रा का ड्रेस मटेरियल चाहिए, त्योहारी सिलेक्शन, या किसी ख़ास ग्राहक की माँग के लिए कुछ। अपना डिलीवरी शहर, अनुमानित मात्रा और पहुँचने की ज़रूरी तारीख़ शामिल कीजिए। अगर कोई रेफ़रेंस तस्वीर है, तो बताइए कि उसमें आपको क्या पसंद है — रंग, प्रिंट, बनावट या पूरा लुक। अकेली तस्वीर सप्लायर को यह नहीं बताती कि कौन-सी बात ज़रूरी है।",
            "अपनी खरीद कीमत और बिक्री कीमत अलग-अलग रखिए। किसी दूसरे ऑफ़र से तुलना करने से पहले पूछिए कि कोटेशन में क्या-क्या शामिल है। लिखी हुई छोटी ब्रीफ़ को दोबारा देखना, बिखरे हुए लंबे मैसेज पढ़ने से कहीं आसान है।",
            "अगर आप दूसरे शहर या देश से खरीद रहे हैं, तो यही ब्रीफ़ आपको दूर बैठे सूरत से कपड़ा मंगवाने देती है — हर विकल्प देखने के लिए बाज़ार जाने की ज़रूरत नहीं पड़ती।",
          ],
          "hi-en": [
            "Tay kijiye ki aapko rozmarra ka dress material chahiye, festive selection, ya kisi khaas customer ki demand ke liye kuch. Apna delivery city, approximate quantity aur arrival ki zaroori date shamil kijiye. Agar koi reference image hai, to bataiye ki usme aapko kya pasand hai — colour, print, texture ya overall look. Akeli image supplier ko yeh nahi batati ki kaun si detail zaroori hai.",
            "Apni buying price aur selling price alag-alag rakhiye. Kisi doosre offer se compare karne se pehle poochiye ki quotation mein kya kya shamil hai. Likhi hui chhoti brief ko dobara dekhna, bikhre hue lambe messages padhne se kahin aasan hai.",
            "Agar aap doosre shahar ya desh se khareed rahe hain, to yahi brief aapko remote rehkar Surat se fabric mangwane deti hai — har option dekhne ke liye market jaane ki zaroorat nahi padti.",
          ],
        },
      },
      {
        heading: {
          en: "Understand exactly what makes up the set",
          hi: "समझिए कि सेट में असल में क्या-क्या है",
          "hi-en": "Samajhiye ki set mein asal mein kya kya hai",
        },
        paragraphs: {
          en: [
            "Ask for the stated composition and measurements of each component. A set may have different materials for the top, bottom and dupatta, so confirm each separately. Check whether any component is optional and whether the product is unstitched, semi-stitched or ready to wear. Do not assume the styling shown in a photograph is included in the purchase.",
            "For the sets we supply, our dress material wholesale page explains who we work with and how to request the catalogue.",
          ],
          hi: [
            "हर हिस्से की बताई गई सामग्री और नाप माँगिए। एक सेट में टॉप, बॉटम और दुपट्टे का कपड़ा अलग-अलग हो सकता है, इसलिए हर एक की अलग पुष्टि कीजिए। देखिए कि कोई हिस्सा वैकल्पिक तो नहीं, और प्रोडक्ट अनस्टिच्ड है, सेमी-स्टिच्ड या रेडी टू वियर। यह मान लेना ठीक नहीं कि तस्वीर में दिख रही पूरी स्टाइलिंग खरीद में शामिल है।",
            "हम कौन-से सेट सप्लाई करते हैं, यह हमारे ड्रेस मटेरियल थोक पेज पर है — हम किनके साथ काम करते हैं और कैटलॉग कैसे मँगवाएँ।",
          ],
          "hi-en": [
            "Har component ki batayi gayi composition aur measurements maangiye. Ek set mein top, bottom aur dupatte ka fabric alag alag ho sakta hai, isliye har ek ki alag confirmation lijiye. Dekhiye ki koi component optional to nahi, aur product unstitched hai, semi-stitched ya ready to wear. Yeh maan lena theek nahi ki photograph mein dikh rahi poori styling purchase mein shamil hai.",
            "Hum kaun se sets supply karte hain, yeh hamare dress material wholesale page par hai — hum kinke saath kaam karte hain aur catalogue kaise mangwayein.",
          ],
        },
        checklist: {
          en: [
            "What are the product code, composition and usable measurements?",
            "Which components and accessories are included?",
            "What care instructions and product limitations should the retailer communicate?",
          ],
          hi: [
            "प्रोडक्ट कोड, सामग्री और इस्तेमाल लायक नाप क्या हैं?",
            "कौन-कौन से हिस्से और सहायक सामान शामिल हैं?",
            "रिटेलर को देखभाल के कौन-से निर्देश और प्रोडक्ट की कौन-सी सीमाएँ बतानी चाहिए?",
          ],
          "hi-en": [
            "Product code, composition aur usable measurements kya hain?",
            "Kaun se components aur accessories included hain?",
            "Retailer ko care instructions aur product ki kaun si limitations batani chahiye?",
          ],
        },
      },
      {
        heading: {
          en: "Use the sample to answer specific questions",
          hi: "सैंपल से ठोस सवालों के जवाब लीजिए",
          "hi-en": "Sample se thos sawalon ke jawab lijiye",
        },
        paragraphs: {
          en: [
            "Ask whether a physical sample is available, what it costs and whether it represents the proposed bulk supply. Look at the fabric in ordinary lighting and examine its feel, drape, transparency and finishing. For performance requirements such as washing behaviour or colourfastness, ask what supporting information or testing is available; appearance alone cannot establish those properties.",
            "Keep a record of the sample code and approval date. If you ask for a change, obtain a revised specification or sample approval rather than relying on a verbal understanding.",
          ],
          hi: [
            "पूछिए कि असली सैंपल मिल सकता है या नहीं, उसकी कीमत क्या है, और क्या वह प्रस्तावित बल्क सप्लाई का सही प्रतिनिधित्व करता है। कपड़े को सामान्य रोशनी में देखिए और उसका एहसास, गिरने का अंदाज़ (ड्रेप), पारदर्शिता और फ़िनिशिंग जाँचिए। धुलाई या रंग के पक्केपन (कलरफ़ास्टनेस) जैसी बातों के लिए पूछिए कि कौन-सी जानकारी या जाँच उपलब्ध है; सिर्फ़ देखकर ये गुण तय नहीं किए जा सकते।",
            "सैंपल कोड और मंज़ूरी की तारीख़ लिखकर रखिए। अगर आप कोई बदलाव माँगते हैं, तो ज़ुबानी समझ पर भरोसा करने के बजाय संशोधित स्पेसिफ़िकेशन या नई सैंपल मंज़ूरी लीजिए।",
          ],
          "hi-en": [
            "Poochiye ki physical sample mil sakta hai ya nahi, uski cost kya hai, aur kya wo proposed bulk supply ko sahi represent karta hai. Fabric ko normal lighting mein dekhiye aur uska feel, drape, transparency aur finishing parkhiye. Washing behaviour ya colourfastness jaisi baaton ke liye poochiye ki kaun si information ya testing available hai; sirf dekhkar ye properties tay nahi ki ja sakti.",
            "Sample code aur approval date likhkar rakhiye. Agar aap koi change maangte hain, to zubani samajh par bharosa karne ke bajaye revised specification ya nayi sample approval lijiye.",
          ],
        },
      },
      {
        heading: {
          en: "Check quantities and repeat availability",
          hi: "मात्रा और दोबारा उपलब्धता जाँचिए",
          "hi-en": "Quantity aur repeat availability check kijiye",
        },
        paragraphs: {
          en: [
            "Ask whether the minimum applies per design, colour, catalogue or total order. Find out whether you must purchase a full set of colourways and whether mixed selections are possible. This helps you judge whether the order fits your customers and the amount of stock you can carry.",
            "Discuss repeat orders separately. Ask which designs are currently available, which require production and what may change between batches. Treat a popular design as a replenishment option only after availability and lead time have been confirmed.",
          ],
          hi: [
            "पूछिए कि न्यूनतम मात्रा हर डिज़ाइन पर लागू है, हर रंग पर, पूरे कैटलॉग पर या कुल ऑर्डर पर। जानिए कि क्या आपको सारे रंग एक साथ लेने होंगे और क्या मिला-जुला सिलेक्शन मुमकिन है। इससे तय होता है कि ऑर्डर आपके ग्राहकों और आपके स्टॉक रखने की क्षमता से मेल खाता है या नहीं।",
            "रिपीट ऑर्डर पर अलग से बात कीजिए। पूछिए कि कौन-से डिज़ाइन अभी उपलब्ध हैं, किनका उत्पादन करना पड़ेगा, और बैच बदलने पर क्या फ़र्क़ आ सकता है। किसी लोकप्रिय डिज़ाइन को दोबारा मँगाने का विकल्प तभी मानिए जब उपलब्धता और लीड टाइम की पुष्टि हो जाए।",
          ],
          "hi-en": [
            "Poochiye ki minimum quantity har design par lagu hai, har colour par, poore catalogue par ya total order par. Jaaniye ki kya aapko saare colourways ek saath lene honge aur kya mixed selection mumkin hai. Isse tay hota hai ki order aapke customers aur aapki stock rakhne ki capacity se match karta hai ya nahi.",
            "Repeat orders par alag se baat kijiye. Poochiye ki kaun se designs abhi available hain, kinka production karna padega, aur batch badalne par kya fark aa sakta hai. Kisi popular design ko dobara mangwane ka option tabhi maaniye jab availability aur lead time confirm ho jaye.",
          ],
        },
      },
      {
        heading: {
          en: "Confirm the full order before paying",
          hi: "भुगतान से पहले पूरा ऑर्डर पक्का कीजिए",
          "hi-en": "Payment se pehle poora order pakka kijiye",
        },
        paragraphs: {
          en: [
            "Request a written summary covering quantities, prices, applicable taxes, packing, freight, payment stages and the dispatch estimate. Confirm how defects, shortages or an incorrect item should be reported and what evidence the supplier needs. Those terms should be agreed before the shipment, not worked out after a problem.",
            "For your first purchase, consider a manageable selection that lets you learn which products your customers actually choose. Record what sells, what generates questions and what remains unsold. That record can make your next sourcing brief more precise.",
          ],
          hi: [
            "लिखित सारांश माँगिए जिसमें मात्रा, कीमत, लागू कर, पैकिंग, भाड़ा, भुगतान के चरण और भेजने का अनुमान शामिल हो। यह भी तय कीजिए कि ख़राबी, कम माल या ग़लत आइटम की शिकायत कैसे करनी है और सप्लायर को कौन-सा सबूत चाहिए। ये शर्तें माल भेजने से पहले तय होनी चाहिए, समस्या आने के बाद नहीं।",
            "पहली खरीद में इतना ही लीजिए जितना सँभाल सकें, ताकि पता चले कि आपके ग्राहक असल में क्या चुनते हैं। लिखते जाइए कि क्या बिका, किस पर सवाल आए और क्या नहीं बिका। यही रिकॉर्ड आपकी अगली ब्रीफ़ को ज़्यादा सटीक बनाएगा।",
          ],
          "hi-en": [
            "Likhit summary maangiye jisme quantity, price, applicable taxes, packing, freight, payment stages aur dispatch estimate shamil ho. Yeh bhi tay kijiye ki defect, shortage ya galat item ki complaint kaise karni hai aur supplier ko kaun sa evidence chahiye. Ye terms shipment se pehle tay honi chahiye, problem aane ke baad nahi.",
            "Pehli purchase mein utna hi lijiye jitna sambhal sakein, taaki pata chale ki aapke customers asal mein kya choose karte hain. Likhte jaiye ki kya bika, kis par sawal aaye aur kya nahi bika. Yahi record aapki agli sourcing brief ko zyada precise banayega.",
          ],
        },
        checklist: {
          en: [
            "Save the final quotation and approved product details together.",
            "Confirm the delivery address and receiving contact.",
            "Agree how substitutions or delays will be communicated.",
          ],
          hi: [
            "अंतिम कोटेशन और मंज़ूर प्रोडक्ट की जानकारी एक साथ सहेजिए।",
            "डिलीवरी का पता और माल लेने वाले का संपर्क पक्का कीजिए।",
            "तय कीजिए कि बदलाव या देरी की सूचना कैसे दी जाएगी।",
          ],
          "hi-en": [
            "Final quotation aur approved product details ek saath save kijiye.",
            "Delivery address aur receiving contact confirm kijiye.",
            "Tay kijiye ki substitution ya delay ki information kaise di jayegi.",
          ],
        },
      },
    ],
    faq: [
      {
        question: {
          en: "Is there a fixed minimum order quantity for dress material?",
          hi: "क्या ड्रेस मटेरियल की कोई तय न्यूनतम मात्रा होती है?",
          "hi-en": "Kya dress material ki koi fixed minimum quantity hoti hai?",
        },
        answer: {
          en: "No — minimum quantities vary by catalogue, design and colour, and some suppliers apply it per component in a set rather than per piece. A more useful question than what the MOQ is in general is how it is calculated for the specific lot you are considering: per design, per colourway, or across the catalogue as a whole. Confirm this before comparing quotations, since two suppliers quoting the 'same' MOQ can mean different things.",
          hi: "नहीं — न्यूनतम मात्रा कैटलॉग, डिज़ाइन और रंग के हिसाब से अलग-अलग होती है, और कुछ सप्लायर इसे सेट के हर हिस्से पर अलग से भी लागू करते हैं। असली सवाल यह नहीं कि न्यूनतम मात्रा आम तौर पर क्या है, बल्कि यह कि जिस लॉट में आपकी दिलचस्पी है उसके लिए यह कैसे तय होती है — हर डिज़ाइन पर, हर रंग पर, या पूरे कैटलॉग पर। कोटेशन की तुलना करने से पहले यह पक्का कर लीजिए, क्योंकि दो सप्लायरों की 'एक जैसी' न्यूनतम मात्रा का मतलब अलग-अलग हो सकता है।",
          "hi-en":
            "Nahin — minimum quantity catalogue, design aur colour ke hisaab se alag alag hoti hai, aur kuch suppliers ise set ke har component par alag se bhi apply karte hain. Asli sawal yeh nahi ki minimum quantity aam taur par kya hai, balki yeh ki jis lot mein aapki dilchaspi hai uske liye yeh kaise tay hoti hai — har design par, har colour par, ya poore catalogue par. Quotation compare karne se pehle yeh pakka kar lijiye, kyunki do suppliers ki 'ek jaisi' minimum quantity ka matlab alag alag ho sakta hai.",
        },
      },
      {
        question: {
          en: "What's the difference between dress material and regular yardage?",
          hi: "ड्रेस मटेरियल और सामान्य गज़ कपड़े (yardage) में क्या फ़र्क़ है?",
          "hi-en": "Dress material aur regular yardage mein kya farak hai?",
        },
        answer: {
          en: "Dress material is usually sold as a set — top, bottom and dupatta pieces together, in a fixed combination — rather than as fabric by the metre. That changes what you need to check: a yardage order is specified by composition, width and length; a dress material set also needs confirmation of what each component contains, whether any piece is optional, and whether the set is unstitched, semi-stitched or ready to wear.",
          hi: "ड्रेस मटेरियल आमतौर पर एक सेट के रूप में बिकता है — टॉप, बॉटम और दुपट्टे के टुकड़े एक तय कॉम्बिनेशन में — न कि मीटर के हिसाब से कपड़े के रूप में। इससे यह तय होता है कि आपको क्या जाँचना है: गज़ कपड़े के ऑर्डर में सामग्री, चौड़ाई और लंबाई बताई जाती है; ड्रेस मटेरियल सेट में यह भी पक्का करना होता है कि हर हिस्से में क्या है, कोई हिस्सा वैकल्पिक तो नहीं, और सेट अनस्टिच्ड है, सेमी-स्टिच्ड या रेडी टू वियर।",
          "hi-en":
            "Dress material aam taur par ek set ke roop mein bikta hai — top, bottom aur dupatte ke tukde ek tay combination mein — na ki meter ke hisaab se fabric ke roop mein. Isse yeh tay hota hai ki aapko kya jaanchna hai: yardage order mein composition, width aur length batayi jaati hai; dress material set mein yeh bhi pakka karna hota hai ki har component mein kya hai, koi component optional to nahi, aur set unstitched hai, semi-stitched ya ready to wear.",
        },
      },
      {
        question: {
          en: "Can I order dress material if I'm not based in India?",
          hi: "क्या मैं भारत से बाहर रहते हुए भी ड्रेस मटेरियल ऑर्डर कर सकता हूँ?",
          "hi-en": "Kya main India se bahar rehte hue bhi dress material order kar sakta hoon?",
        },
        answer: {
          en: "Yes. The buying brief and sample process are the same regardless of where you are; the main addition is confirming delivery location, applicable duties and the dispatch timeline in writing before the order is placed.",
          hi: "हाँ। खरीद की ब्रीफ़ और सैंपल की प्रक्रिया वही रहती है, चाहे आप कहीं भी हों; मुख्य फ़र्क़ यह है कि डिलीवरी की जगह, लागू शुल्क और डिस्पैच की समय-सीमा को ऑर्डर देने से पहले लिखित में पक्का करना होता है।",
          "hi-en":
            "Haan. Buying brief aur sample ki process wahi rehti hai, chahe aap kahin bhi hon; mukhya farak yeh hai ki delivery location, applicable duties aur dispatch ki timeline ko order dene se pehle likhit mein pakka karna hota hai.",
        },
      },
    ],
  },
  {
    slug: "why-similar-sarees-have-different-prices",
    related: ["how-to-read-a-fabric-spec", "fabric-gsm-bulk-orders"],
    inlineLinks: [
      {
        phrase: {
          en: "a complete specification",
          hi: "पूरा स्पेसिफ़िकेशन",
          "hi-en": "poora specification",
        },
        href: "/blog/how-to-read-a-fabric-spec",
      },
    ],
    image: wovenDetail,
    published: "2026-09-12",
    imageAlt: {
      en: "A woven cloth seen up close, the interlacing of warp and weft visible thread by thread",
      hi: "पास से दिखा बुना हुआ कपड़ा, जिसमें ताने-बाने की बुनावट धागे-धागे दिख रही है",
      "hi-en":
        "Paas se dikha woven cloth, jisme warp aur weft ki bunavat dhaage dhaage dikh rahi hai",
    },
    category: {
      en: "Product knowledge",
      hi: "प्रोडक्ट की जानकारी",
      "hi-en": "Product knowledge",
    },
    /* Shortened for search: the visible title above ~60 characters is
       truncated in results, and the cut falls on the specific term.
       Derived by trimming the display title rather than rewritten, so the
       Hindi is the reviewed-pending wording already on the page. */
    metaTitle: {
      en: "Why similar sarees have different prices",
      hi: "एक जैसी साड़ियों की कीमत अलग क्यों होती है",
      "hi-en": "Ek jaisi sarees ki price alag kyun hoti hai",
    },
    title: {
      en: "Why two similar-looking sarees can have different prices",
      hi: "एक जैसी दिखने वाली दो साड़ियों की कीमत अलग क्यों होती है",
      "hi-en": "Ek jaisi dikhne wali do sarees ki price alag kyun hoti hai",
    },
    excerpt: {
      en: "A closer look at how fabric, finishing and workmanship can influence a quote.",
      hi: "कपड़ा, फ़िनिशिंग और कारीगरी कोटेशन को कैसे बदलते हैं — क़रीब से एक नज़र।",
      "hi-en":
        "Fabric, finishing aur workmanship quote ko kaise badalte hain — kareeb se ek nazar.",
    },
    introduction: {
      en: "Two sarees can look close in a catalogue and still be different buying propositions. Rather than assuming the higher quote is better or the lower quote is a bargain, ask the supplier to explain the specification behind each price. Your goal is to compare the actual products and order terms. Here is a practical way to structure that conversation before choosing a range for your shop.",
      hi: "कैटलॉग में दो साड़ियाँ लगभग एक जैसी दिख सकती हैं, फिर भी खरीद के लिहाज़ से अलग हो सकती हैं। यह मान लेने के बजाय कि ऊँची कीमत बेहतर है या कम कीमत फ़ायदे का सौदा, सप्लायर से पूछिए कि हर कीमत के पीछे स्पेसिफ़िकेशन क्या है। मक़सद असली प्रोडक्ट और ऑर्डर की शर्तों की तुलना करना है। अपनी दुकान के लिए रेंज चुनने से पहले यह बातचीत ऐसे कीजिए।",
      "hi-en":
        "Catalogue mein do sarees lagbhag ek jaisi dikh sakti hain, phir bhi buying ke lihaz se alag ho sakti hain. Yeh maan lene ke bajaye ki oonchi quote behtar hai ya kam quote faayde ka sauda, supplier se poochiye ki har price ke peeche specification kya hai. Maqsad asli products aur order terms compare karna hai. Apni shop ke liye range choose karne se pehle yeh baatcheet aise kijiye.",
    },
    sections: [
      {
        heading: {
          en: "Compare the fabric description first",
          hi: "पहले कपड़े का विवरण मिलाइए",
          "hi-en": "Pehle fabric description compare kijiye",
        },
        paragraphs: {
          en: [
            "Ask for the stated fibre composition, construction and measurements of both products. Descriptive names and styling language are not a complete specification. If a particular fibre content is essential to your purchase, ask what documentation supports that description rather than drawing a conclusion from the shine or feel of a photograph.",
            "Put the answers side by side. A useful comparison starts with equivalent information: the saree length and width, whether a blouse piece is included, and the details of any separate components. If a specification is missing, mark it as unknown and ask for clarification.",
          ],
          hi: [
            "दोनों प्रोडक्ट की बताई गई रेशा-सामग्री, बुनावट और नाप माँगिए। सजीले नाम और स्टाइलिंग की भाषा पूरा स्पेसिफ़िकेशन नहीं होती। अगर आपकी खरीद के लिए कोई ख़ास फ़ाइबर ज़रूरी है, तो पूछिए कि उस विवरण के पीछे कौन-सा दस्तावेज़ है — तस्वीर की चमक या एहसास से नतीजा मत निकालिए।",
            "जवाबों को आमने-सामने रखिए। अच्छी तुलना बराबर की जानकारी से शुरू होती है: साड़ी की लंबाई-चौड़ाई, ब्लाउज़ पीस शामिल है या नहीं, और अलग से आने वाले हिस्सों का ब्योरा। कोई स्पेसिफ़िकेशन न मिले तो उसे 'अज्ञात' लिखिए और स्पष्ट कीजिए।",
          ],
          "hi-en": [
            "Dono products ki batayi gayi fibre composition, construction aur measurements maangiye. Fancy naam aur styling ki bhasha poora specification nahi hoti. Agar aapki purchase ke liye koi khaas fibre content zaroori hai, to poochiye ki us description ke peeche kaun sa documentation hai — photograph ki chamak ya feel se conclusion mat nikaliye.",
            "Jawabon ko aamne-saamne rakhiye. Achhi comparison barabar ki information se shuru hoti hai: saree ki length-width, blouse piece included hai ya nahi, aur alag se aane wale components ka byora. Koi specification na mile to use unknown likhiye aur clarification maangiye.",
          ],
        },
      },
      {
        heading: {
          en: "Look closely at the work and finishing",
          hi: "कारीगरी और फ़िनिशिंग ध्यान से देखिए",
          "hi-en": "Work aur finishing dhyan se dekhiye",
        },
        paragraphs: {
          en: [
            "Request close-up photographs of the border, the body, the reverse and the areas carrying embellishment. Ask which elements are woven, printed, machine embroidered, hand finished or attached separately. Do not infer a production method solely from a product name. Ask the supplier to describe the work used in that particular item.",
            "Where a sample is available, examine the edges, joins and finishing. Note any details your customers are likely to notice or ask about. The aim is to identify meaningful differences between the products, rather than judge the entire garment from one dramatic campaign image.",
          ],
          hi: [
            "बॉर्डर, बॉडी, उल्टी तरफ़ और जहाँ सजावट है — इन सबकी क़रीबी तस्वीरें माँगिए। पूछिए कि कौन-सा हिस्सा बुना है, प्रिंटेड है, मशीन कढ़ाई है, हाथ से फ़िनिश किया है या अलग से जोड़ा गया है। सिर्फ़ प्रोडक्ट के नाम से बनाने का तरीक़ा मत मान लीजिए। सप्लायर से कहिए कि उसी आइटम की कारीगरी बताएँ।",
            "जहाँ सैंपल मिले, वहाँ किनारे, जोड़ और फ़िनिशिंग जाँचिए। जो बातें आपके ग्राहक देखेंगे या पूछेंगे, उन्हें नोट कीजिए। मक़सद है दोनों प्रोडक्ट के बीच असली फ़र्क़ पहचानना, न कि एक शानदार कैंपेन तस्वीर से पूरे परिधान पर राय बना लेना।",
          ],
          "hi-en": [
            "Border, body, ulti taraf aur jahan embellishment hai — in sabki close-up photos maangiye. Poochiye ki kaun sa element woven hai, printed hai, machine embroidered hai, haath se finished hai ya alag se attach kiya gaya hai. Sirf product ke naam se production method mat maan lijiye. Supplier se kahiye ki usi item ki workmanship batayein.",
            "Jahan sample mile, wahan edges, joins aur finishing parkhiye. Jo details aapke customers dekhenge ya poochenge, unhe note kijiye. Maqsad hai dono products ke beech asli fark pehchanna, na ki ek dramatic campaign image se poore garment par raay bana lena.",
          ],
        },
      },
      {
        heading: {
          en: "Check what the photograph is selling",
          hi: "देखिए कि तस्वीर असल में क्या बेच रही है",
          "hi-en": "Dekhiye ki photograph asal mein kya bech rahi hai",
        },
        paragraphs: {
          en: [
            "A styled photograph may show a stitched blouse, jewellery, a belt or other accessories. Confirm what is included in the quoted product and what is only part of the styling. Ask whether the saree is supplied in the same form shown, or whether draping, stitching or alterations are separate.",
            "Request a straightforward product video or additional images if the original presentation leaves details unclear. Where colour matching matters, discuss a physical reference or sample. Make a note of the supplier’s stated limitations before you make promises to your own customer.",
          ],
          hi: [
            "स्टाइल की हुई तस्वीर में सिला हुआ ब्लाउज़, गहने, बेल्ट या दूसरे सामान दिख सकते हैं। पक्का कीजिए कि कोट की गई कीमत में क्या शामिल है और क्या सिर्फ़ स्टाइलिंग का हिस्सा है। पूछिए कि साड़ी उसी रूप में मिलेगी जैसी दिख रही है, या ड्रेपिंग, सिलाई और फेरबदल अलग से हैं।",
            "अगर तस्वीरों से बात साफ़ न हो, तो सीधा प्रोडक्ट वीडियो या और तस्वीरें माँगिए। जहाँ रंग का मिलान ज़रूरी है, वहाँ असली रेफ़रेंस या सैंपल की बात कीजिए। अपने ग्राहक से कोई वादा करने से पहले सप्लायर की बताई सीमाएँ लिख लीजिए।",
          ],
          "hi-en": [
            "Styled photograph mein sila hua blouse, jewellery, belt ya doosre accessories dikh sakte hain. Pakka kijiye ki quoted product mein kya included hai aur kya sirf styling ka hissa hai. Poochiye ki saree usi form mein milegi jaisi dikh rahi hai, ya draping, stitching aur alteration alag se hain.",
            "Agar photos se baat saaf na ho, to seedha product video ya aur images maangiye. Jahan colour matching zaroori hai, wahan physical reference ya sample ki baat kijiye. Apne customer se koi vaada karne se pehle supplier ki batayi limitations likh lijiye.",
          ],
        },
      },
      {
        heading: {
          en: "Compare the commercial terms too",
          hi: "व्यापारिक शर्तों की भी तुलना कीजिए",
          "hi-en": "Commercial terms ki bhi comparison kijiye",
        },
        paragraphs: {
          en: [
            "Make sure both quotations use the same quantity basis. One may refer to a single item while another depends on buying an entire catalogue or a larger assortment. Ask whether taxes, delivery and any customisation are included. Also confirm payment terms, dispatch estimates and the process for reporting a defective or incorrect item.",
            "Availability matters to your buying decision. Ask whether the quoted item is in stock, made to order or dependent on a future batch. A price comparison is incomplete if one option cannot meet your required arrival date.",
          ],
          hi: [
            "देखिए कि दोनों कोटेशन एक ही मात्रा के आधार पर हैं। हो सकता है एक अकेले आइटम का हो और दूसरा पूरे कैटलॉग या बड़े सिलेक्शन पर टिका हो। पूछिए कि कर, डिलीवरी और कोई भी फेरबदल शामिल है या नहीं। भुगतान की शर्तें, भेजने का अनुमान और ख़राब या ग़लत आइटम की शिकायत का तरीक़ा भी पक्का कीजिए।",
            "उपलब्धता आपके खरीद फ़ैसले के लिए मायने रखती है। पूछिए कि कोट किया गया आइटम स्टॉक में है, ऑर्डर पर बनेगा, या किसी आने वाले बैच पर निर्भर है। अगर एक विकल्प आपकी ज़रूरी तारीख़ तक पहुँच ही नहीं सकता, तो कीमत की तुलना अधूरी है।",
          ],
          "hi-en": [
            "Dekhiye ki dono quotations ek hi quantity basis par hain. Ho sakta hai ek akele item ka ho aur doosra poore catalogue ya bade assortment par tika ho. Poochiye ki taxes, delivery aur koi bhi customisation included hai ya nahi. Payment terms, dispatch estimate aur defective ya galat item ki reporting ka process bhi confirm kijiye.",
            "Availability aapke buying decision ke liye maayne rakhti hai. Poochiye ki quoted item stock mein hai, order par banega, ya kisi future batch par depend karta hai. Agar ek option aapki zaroori arrival date tak pahunch hi nahi sakta, to price comparison adhoori hai.",
          ],
        },
        checklist: {
          en: [
            "Are quantities and included components comparable?",
            "Are the same costs included in both quotations?",
            "Are sample, delivery and issue-resolution terms clear?",
          ],
          hi: [
            "क्या मात्रा और शामिल हिस्से तुलना करने लायक हैं?",
            "क्या दोनों कोटेशन में एक जैसी लागतें शामिल हैं?",
            "क्या सैंपल, डिलीवरी और शिकायत निपटाने की शर्तें साफ़ हैं?",
          ],
          "hi-en": [
            "Kya quantity aur included components comparable hain?",
            "Kya dono quotations mein ek jaisi costs included hain?",
            "Kya sample, delivery aur issue-resolution terms clear hain?",
          ],
        },
      },
      {
        heading: {
          en: "Choose for the customer you actually serve",
          hi: "उसी ग्राहक के हिसाब से चुनिए जिसे आप बेचते हैं",
          "hi-en": "Usi customer ke hisaab se chuniye jise aap bechte hain",
        },
        paragraphs: {
          en: [
            "Once you understand the differences, decide which ones matter to your shop. Your customers may prioritise a particular look, a comfortable feel, easy styling or a familiar price range. Ask yourself which details you can explain honestly at the counter and whether the product fits the occasions your buyers shop for.",
            "Save the specifications and your observations against the product code. After selling the range, add customer questions, feedback and reorder requests. Over time, this gives you a practical buying record and a stronger basis for discussing the next collection with your supplier.",
          ],
          hi: [
            "फ़र्क़ समझ लेने के बाद तय कीजिए कि आपकी दुकान के लिए कौन-सा फ़र्क़ मायने रखता है। आपके ग्राहकों के लिए कोई ख़ास लुक, आरामदेह एहसास, आसान स्टाइलिंग या जानी-पहचानी कीमत ज़्यादा ज़रूरी हो सकती है। ख़ुद से पूछिए कि काउंटर पर आप कौन-सी बातें ईमानदारी से समझा सकते हैं, और क्या प्रोडक्ट उन मौकों पर फिट बैठता है जिनके लिए आपके ग्राहक खरीदते हैं।",
            "स्पेसिफ़िकेशन और अपनी टिप्पणियाँ प्रोडक्ट कोड के साथ सहेजिए। रेंज बिक जाने के बाद उसमें ग्राहकों के सवाल, प्रतिक्रिया और दोबारा माँग जोड़ते जाइए। समय के साथ यह आपका काम का खरीद-रिकॉर्ड बन जाएगा और अगले कलेक्शन पर सप्लायर से बात करने का मज़बूत आधार।",
          ],
          "hi-en": [
            "Fark samajh lene ke baad tay kijiye ki aapki shop ke liye kaun sa fark maayne rakhta hai. Aapke customers ke liye koi khaas look, aaramdeh feel, aasan styling ya jaani-pehchani price range zyada zaroori ho sakti hai. Khud se poochiye ki counter par aap kaun si baatein imaandari se samjha sakte hain, aur kya product un occasions par fit baithta hai jinke liye aapke buyers khareedte hain.",
            "Specifications aur apni observations product code ke saath save kijiye. Range bik jaane ke baad usme customers ke sawal, feedback aur reorder requests jodte jaiye. Samay ke saath yeh aapka kaam ka buying record ban jayega aur agle collection par supplier se baat karne ka mazboot aadhaar.",
          ],
        },
      },
    ],
  },
  {
    slug: "sample-to-bulk-order-checklist",
    related: ["fabric-gsm-bulk-orders", "how-to-read-a-fabric-spec"],
    inlineLinks: [
      {
        phrase: {
          en: "agreed specification",
          hi: "तय स्पेसिफ़िकेशन",
          "hi-en": "tay specification",
        },
        href: "/blog/how-to-read-a-fabric-spec",
      },
      {
        phrase: {
          en: "source fabric from Surat remotely",
          hi: "दूर बैठे सूरत से कपड़ा मंगवा",
          "hi-en": "remote rehkar Surat se fabric mangwa",
        },
        href: "/blog/source-fabric-from-surat",
      },
    ],
    image: swatchOnCard,
    published: "2026-09-12",
    imageAlt: {
      en: "A woven swatch held on its reference card, the form a sample approval takes",
      hi: "अपने रेफ़रेंस कार्ड पर लगा बुना हुआ स्वैच — सैंपल मंज़ूरी इसी रूप में होती है",
      "hi-en": "Apne reference card par laga woven swatch — sample approval isi roop mein hoti hai",
    },
    category: {
      en: "Sourcing guide",
      hi: "सोर्सिंग गाइड",
      "hi-en": "Sourcing guide",
    },
    /* Shortened for search: the visible title above ~60 characters is
       truncated in results, and the cut falls on the specific term.
       Derived by trimming the display title rather than rewritten, so the
       Hindi is the reviewed-pending wording already on the page. */
    metaTitle: {
      en: "Sample to bulk order: a buyer’s checklist",
      hi: "सैंपल से बल्क ऑर्डर तक: खरीदार की चेकलिस्ट",
      "hi-en": "Sample se bulk order: buyer ki checklist",
    },
    title: {
      en: "From sample to bulk order: a buyer’s checklist",
      hi: "सैंपल से बल्क ऑर्डर तक: खरीदार की चेकलिस्ट",
      "hi-en": "Sample se bulk order tak: buyer ki checklist",
    },
    excerpt: {
      en: "The details to confirm before moving from a sample you like to a larger order.",
      hi: "पसंद आए सैंपल से बड़े ऑर्डर तक जाने से पहले कौन-सी बातें पक्की कर लेनी चाहिए।",
      "hi-en":
        "Pasand aaye sample se bade order tak jaane se pehle kaun si baatein pakki karni chahiye.",
    },
    introduction: {
      en: "Approving a sample is an important decision, but it is only one part of placing a bulk order. You also need a shared understanding of the product, quantities, timing and what happens if something changes. Keep the approved sample and the final order details connected through a clear product code. The checklist below helps you organise that handover without relying on memory or scattered chat messages.",
      hi: "सैंपल मंज़ूर करना अहम फ़ैसला है, पर बल्क ऑर्डर देने का वह सिर्फ़ एक हिस्सा है। प्रोडक्ट, मात्रा, समय और बदलाव होने पर क्या होगा — इन सब पर दोनों पक्षों की समझ एक जैसी होनी चाहिए। मंज़ूर सैंपल और अंतिम ऑर्डर को एक साफ़ प्रोडक्ट कोड से जोड़े रखिए। नीचे दी गई चेकलिस्ट यह काम याददाश्त या बिखरे चैट मैसेज के भरोसे छोड़े बिना व्यवस्थित करने में मदद करती है।",
      "hi-en":
        "Sample approve karna ahem faisla hai, par bulk order dene ka wo sirf ek hissa hai. Product, quantity, timing aur badlaav hone par kya hoga — in sab par dono taraf ki samajh ek jaisi honi chahiye. Approved sample aur final order ko ek clear product code se jode rakhiye. Neeche di gayi checklist yeh kaam yaaddasht ya bikhre chat messages ke bharose chhode bina organise karne mein madad karti hai.",
    },
    sections: [
      {
        heading: {
          en: "Record exactly what you approved",
          hi: "जो मंज़ूर किया, उसे ठीक-ठीक दर्ज कीजिए",
          "hi-en": "Jo approve kiya, use theek theek record kijiye",
        },
        paragraphs: {
          en: [
            "Create a simple approval record with the sample code, supplier, date, photographs and agreed specification. Include the composition, dimensions, colour reference, finish and components relevant to your purchase. If the supplier uses a different code, record both so that the sample and the quotation can be matched.",
            "List any requested changes separately. A sample approved subject to a different colour or finish is not the same as unconditional approval. Ask how those changes will be confirmed and whether you need to review a revised sample before the order proceeds.",
            "This record is also what makes it practical to source fabric from Surat remotely: the approved sample, not a photograph, becomes the reference the bulk supply is checked against.",
          ],
          hi: [
            "एक सादा मंज़ूरी-रिकॉर्ड बनाइए जिसमें सैंपल कोड, सप्लायर, तारीख़, तस्वीरें और तय स्पेसिफ़िकेशन हों। उसमें सामग्री, नाप, रंग का रेफ़रेंस, फ़िनिश और आपकी खरीद से जुड़े हिस्से शामिल कीजिए। अगर सप्लायर का कोड अलग है, तो दोनों कोड लिखिए ताकि सैंपल और कोटेशन आपस में मिलाए जा सकें।",
            "माँगे गए बदलाव अलग से लिखिए। किसी दूसरे रंग या फ़िनिश की शर्त पर मंज़ूर किया गया सैंपल, बिना शर्त मंज़ूरी नहीं होता। पूछिए कि वे बदलाव कैसे पक्के होंगे और क्या ऑर्डर आगे बढ़ने से पहले आपको नया सैंपल देखना होगा।",
            "यही रिकॉर्ड दूर बैठे सूरत से कपड़ा मंगवाना व्यावहारिक बनाता है: बल्क माल की जाँच तस्वीर से नहीं, मंज़ूर सैंपल से होती है।",
          ],
          "hi-en": [
            "Ek simple approval record banaiye jisme sample code, supplier, date, photographs aur tay specification hon. Usme composition, dimensions, colour reference, finish aur aapki purchase se jude components shamil kijiye. Agar supplier ka code alag hai, to dono code likhiye taaki sample aur quotation aapas mein match ho sakein.",
            "Maange gaye changes alag se likhiye. Kisi doosre colour ya finish ki shart par approve kiya gaya sample, bina shart approval nahi hota. Poochiye ki wo changes kaise confirm honge aur kya order aage badhne se pehle aapko revised sample dekhna hoga.",
            "Yahi record remote rehkar Surat se fabric mangwana practical banata hai: bulk maal ki jaanch photograph se nahi, approved sample se hoti hai.",
          ],
        },
        checklist: {
          en: [
            "Identify the approved sample and its version.",
            "Record requested changes and who confirmed them.",
            "Keep the physical reference where practical.",
          ],
          hi: [
            "मंज़ूर सैंपल और उसका वर्ज़न पहचानिए।",
            "माँगे गए बदलाव और उन्हें किसने पक्का किया, दर्ज कीजिए।",
            "जहाँ मुमकिन हो, असली रेफ़रेंस सँभालकर रखिए।",
          ],
          "hi-en": [
            "Approved sample aur uska version identify kijiye.",
            "Maange gaye changes aur unhe kisne confirm kiya, record kijiye.",
            "Jahan mumkin ho, physical reference sambhal kar rakhiye.",
          ],
        },
      },
      {
        heading: {
          en: "Agree how the bulk supply should match",
          hi: "तय कीजिए कि बल्क सप्लाई किस हद तक मिलनी चाहिए",
          "hi-en": "Tay kijiye ki bulk supply kis had tak match honi chahiye",
        },
        paragraphs: {
          en: [
            "Ask the supplier which characteristics can vary and how you will assess the delivery against the approved reference. Where measurements or performance matter, agree the acceptance criteria and the supporting checks in writing. Do not invent a tolerance or assume a universal standard applies to your order.",
            "If your customer needs a particular test report or specification, raise that requirement before committing. Confirm who will arrange any agreed inspection or testing, when it will happen and whether its cost is included. Ask what happens if the result does not meet the agreed requirement.",
          ],
          hi: [
            "सप्लायर से पूछिए कि कौन-सी बातें थोड़ी-बहुत बदल सकती हैं और डिलीवरी को मंज़ूर रेफ़रेंस से कैसे मिलाया जाएगा। जहाँ नाप या प्रदर्शन मायने रखता है, वहाँ स्वीकार करने की शर्तें और जाँच लिखित में तय कीजिए। अपने मन से कोई छूट मत मान लीजिए और यह भी मत मानिए कि कोई सार्वभौमिक मानक आपके ऑर्डर पर लागू होता है।",
            "अगर आपके ग्राहक को कोई ख़ास टेस्ट रिपोर्ट या स्पेसिफ़िकेशन चाहिए, तो यह माँग ऑर्डर देने से पहले रखिए। पक्का कीजिए कि तय हुई जाँच या निरीक्षण कौन कराएगा, कब होगा और उसका खर्च शामिल है या नहीं। यह भी पूछिए कि नतीजा तय शर्त पर खरा न उतरे तो क्या होगा।",
          ],
          "hi-en": [
            "Supplier se poochiye ki kaun si characteristics thodi-bahut vary kar sakti hain aur delivery ko approved reference se kaise assess kiya jayega. Jahan measurements ya performance maayne rakhta hai, wahan acceptance criteria aur checks likhit mein tay kijiye. Apne mann se koi tolerance mat maan lijiye aur yeh bhi mat maaniye ki koi universal standard aapke order par lagu hota hai.",
            "Agar aapke customer ko koi khaas test report ya specification chahiye, to yeh requirement commit karne se pehle rakhiye. Confirm kijiye ki tay hui inspection ya testing kaun karayega, kab hogi aur uska cost included hai ya nahi. Yeh bhi poochiye ki result tay requirement par khara na utre to kya hoga.",
          ],
        },
      },
      {
        heading: {
          en: "Confirm the quantity breakdown and total cost",
          hi: "मात्रा का ब्योरा और कुल लागत पक्की कीजिए",
          "hi-en": "Quantity breakdown aur total cost pakka kijiye",
        },
        paragraphs: {
          en: [
            "Check the order by product code, colour and unit of sale. Be explicit about whether you are buying metres, pieces, sets or full catalogues. Confirm packing details and whether any quantity variation is allowed. Ask the supplier to flag substitutions for approval rather than assuming an alternative will be acceptable.",
            "Save a final written quotation covering product cost, applicable taxes, packing, freight and payment stages. Verify the payment instructions through your established supplier contact, particularly if they change during the conversation. Keep receipts and order references together for reconciliation.",
          ],
          hi: [
            "ऑर्डर को प्रोडक्ट कोड, रंग और बिक्री की इकाई के हिसाब से जाँचिए। साफ़ लिखिए कि आप मीटर खरीद रहे हैं, पीस, सेट या पूरे कैटलॉग। पैकिंग का ब्योरा और मात्रा में कितना फ़र्क़ चलेगा, यह भी पक्का कीजिए। सप्लायर से कहिए कि कोई भी बदल कर भेजा जाने वाला सामान पहले मंज़ूरी के लिए बताए — यह मत मानिए कि विकल्प अपने आप स्वीकार होगा।",
            "अंतिम लिखित कोटेशन सहेजिए जिसमें प्रोडक्ट की लागत, लागू कर, पैकिंग, भाड़ा और भुगतान के चरण हों। भुगतान की जानकारी अपने पुराने, जाने-पहचाने सप्लायर संपर्क से जाँचिए — ख़ासकर तब, जब बातचीत के बीच वह बदल जाए। रसीदें और ऑर्डर के संदर्भ मिलान के लिए एक साथ रखिए।",
          ],
          "hi-en": [
            "Order ko product code, colour aur unit of sale ke hisaab se check kijiye. Saaf likhiye ki aap metres khareed rahe hain, pieces, sets ya poore catalogues. Packing details aur quantity mein kitna variation chalega, yeh bhi confirm kijiye. Supplier se kahiye ki koi bhi substitution pehle approval ke liye bataye — yeh mat maaniye ki alternative apne aap acceptable hoga.",
            "Final likhit quotation save kijiye jisme product cost, applicable taxes, packing, freight aur payment stages hon. Payment instructions apne purane, jaane-pehchane supplier contact se verify kijiye — khaaskar tab, jab baatcheet ke beech wo badal jayein. Receipts aur order references reconciliation ke liye ek saath rakhiye.",
          ],
        },
      },
      {
        heading: {
          en: "Separate dispatch from arrival",
          hi: "भेजने की तारीख़ और पहुँचने की तारीख़ अलग रखिए",
          "hi-en": "Dispatch date aur arrival date alag rakhiye",
        },
        paragraphs: {
          en: [
            "Ask whether the promised date refers to production completion, dispatch or delivery. Record your required arrival date and discuss whether the proposed schedule can meet it. Confirm the delivery address, receiving contact and how shipment details will be shared.",
            "Agree a process for updates if production, stock availability or transport changes. If partial shipments are possible, discuss whether they suit your business and how they affect costs and payment. A clear update process helps both parties make decisions while there is still time to respond.",
          ],
          hi: [
            "पूछिए कि जो तारीख़ दी गई है वह उत्पादन पूरा होने की है, माल भेजने की, या पहुँचने की। अपनी ज़रूरी पहुँच-तारीख़ लिखिए और बात कीजिए कि प्रस्तावित समय-सारिणी उसे पूरा कर सकती है या नहीं। डिलीवरी का पता, माल लेने वाले का संपर्क और शिपमेंट की जानकारी कैसे मिलेगी — ये पक्के कीजिए।",
            "तय कीजिए कि उत्पादन, स्टॉक या परिवहन में बदलाव होने पर ख़बर कैसे मिलेगी। अगर माल किस्तों में आ सकता है, तो देखिए कि यह आपके कारोबार के लिए ठीक है या नहीं और इससे लागत तथा भुगतान पर क्या असर पड़ेगा। समय रहते सूचना मिलने से दोनों पक्ष फ़ैसला ले पाते हैं।",
          ],
          "hi-en": [
            "Poochiye ki jo date di gayi hai wo production complete hone ki hai, dispatch ki, ya delivery ki. Apni zaroori arrival date likhiye aur baat kijiye ki proposed schedule use pura kar sakta hai ya nahi. Delivery address, receiving contact aur shipment details kaise milengi — ye confirm kijiye.",
            "Tay kijiye ki production, stock ya transport mein badlaav hone par update kaise milega. Agar maal partial shipments mein aa sakta hai, to dekhiye ki yeh aapke business ke liye theek hai ya nahi aur isse cost tatha payment par kya asar padega. Samay rehte update milne se dono taraf faisla le paati hain.",
          ],
        },
      },
      {
        heading: {
          en: "Prepare to receive and review the order",
          hi: "माल लेने और जाँचने की तैयारी कीजिए",
          "hi-en": "Maal lene aur check karne ki taiyari kijiye",
        },
        paragraphs: {
          en: [
            "Before arrival, confirm the time window and process for reporting shortages, damage or specification differences. Ask what photographs, packaging records or other evidence are required. Make sure the person receiving the goods knows where to find the order summary and approved reference.",
            "On receipt, compare the delivery with the agreed order and document any concern promptly. Follow the supplier’s agreed reporting process. After the order is resolved, record product feedback, delivery experience and whether you would reorder. This gives the next purchase a clear starting point.",
          ],
          hi: [
            "माल पहुँचने से पहले तय कीजिए कि कम माल, नुक़सान या स्पेसिफ़िकेशन में फ़र्क़ की शिकायत कितने समय में और किस तरीक़े से करनी है। पूछिए कि कौन-सी तस्वीरें, पैकिंग रिकॉर्ड या दूसरे सबूत चाहिए। जो व्यक्ति माल लेगा, उसे पता होना चाहिए कि ऑर्डर का सारांश और मंज़ूर रेफ़रेंस कहाँ रखे हैं।",
            "माल मिलने पर डिलीवरी की तुलना तय ऑर्डर से कीजिए और कोई भी दिक़्क़त तुरंत लिख लीजिए। सप्लायर के साथ तय शिकायत-प्रक्रिया का पालन कीजिए। मामला निपटने के बाद प्रोडक्ट पर राय, डिलीवरी का अनुभव और यह लिखिए कि दोबारा ऑर्डर करेंगे या नहीं। इससे अगली खरीद की शुरुआत साफ़ रहती है।",
          ],
          "hi-en": [
            "Maal pahunchne se pehle tay kijiye ki shortage, damage ya specification mein fark ki complaint kitne samay mein aur kis tareeke se karni hai. Poochiye ki kaun si photographs, packaging records ya doosre evidence chahiye. Jo vyakti maal lega, use pata hona chahiye ki order summary aur approved reference kahan rakhe hain.",
            "Maal milne par delivery ki tulna tay order se kijiye aur koi bhi dikkat turant likh lijiye. Supplier ke saath tay reporting process follow kijiye. Maamla nipatne ke baad product feedback, delivery ka experience aur yeh likhiye ki dobara order karenge ya nahi. Isse agli purchase ki shuruaat saaf rehti hai.",
          ],
        },
        checklist: {
          en: [
            "Have the approved sample and order summary ready.",
            "Check the received codes and quantities.",
            "Record issues and follow the agreed reporting window.",
          ],
          hi: [
            "मंज़ूर सैंपल और ऑर्डर का सारांश तैयार रखिए।",
            "मिले हुए कोड और मात्रा जाँचिए।",
            "दिक़्क़तें दर्ज कीजिए और तय समय-सीमा में शिकायत कीजिए।",
          ],
          "hi-en": [
            "Approved sample aur order summary taiyar rakhiye.",
            "Mile hue codes aur quantities check kijiye.",
            "Issues record kijiye aur tay reporting window mein complaint kijiye.",
          ],
        },
      },
    ],
    faq: [
      {
        question: {
          en: "How closely should the bulk match the approved sample?",
          hi: "बल्क माल को मंज़ूर सैंपल से कितना मिलता-जुलता होना चाहिए?",
          "hi-en": "Bulk maal ko approved sample se kitna milta-julta hona chahiye?",
        },
        answer: {
          en: "Some variation between a sample and a production lot is normal, particularly in shade, and it is usually wider across dye lots than within one. What matters is agreeing in writing, before the order runs, which properties are being held to the sample and how much variation is acceptable on each. A tolerance recorded in advance is a shared expectation; the same conversation after delivery is a dispute.",
          hi: "सैंपल और प्रोडक्शन लॉट के बीच थोड़ा फ़र्क़ आना सामान्य है, ख़ासकर शेड में, और यह फ़र्क़ एक ही डाई लॉट के भीतर से ज़्यादा अलग-अलग डाई लॉट के बीच होता है। अहम बात यह है कि ऑर्डर चलने से पहले लिखित में तय हो कि कौन-सी बातें सैंपल के मुताबिक़ रखी जाएँगी और हर एक में कितना फ़र्क़ चलेगा। पहले से दर्ज की गई छूट साझा समझ होती है; वही बातचीत डिलीवरी के बाद विवाद बन जाती है।",
          "hi-en":
            "Sample aur production lot ke beech thoda farak aana normal hai, khaaskar shade mein, aur yeh farak ek hi dye lot ke bheetar se zyada alag-alag dye lots ke beech hota hai. Ahem baat yeh hai ki order chalne se pehle likhit mein tay ho ki kaun si baatein sample ke mutabik rakhi jaayengi aur har ek mein kitna farak chalega. Pehle se record ki gayi tolerance saajha samajh hoti hai; wahi baatcheet delivery ke baad vivaad ban jaati hai.",
        },
      },
      {
        question: {
          en: "I approved a sample but asked for a different colour. Is that full approval?",
          hi: "मैंने सैंपल मंज़ूर किया पर रंग बदलने को कहा — क्या वह पूरी मंज़ूरी है?",
          "hi-en":
            "Maine sample approve kiya par colour badalne ko kaha — kya wo poori approval hai?",
        },
        answer: {
          en: "No. A sample approved subject to a change is a conditional approval, and the change itself still has to be confirmed. Ask how it will be evidenced — a revised swatch, a lab dip, a strike-off — and whether you will see it before the bulk runs. Recording the condition next to the approval keeps the two from drifting apart later.",
          hi: "नहीं। किसी बदलाव की शर्त पर मंज़ूर किया गया सैंपल सशर्त मंज़ूरी है, और वह बदलाव ख़ुद अब भी पक्का होना बाक़ी है। पूछिए कि वह कैसे दिखाया जाएगा — नया स्वैच, लैब डिप या स्ट्राइक-ऑफ़ — और क्या बल्क चलने से पहले आप उसे देखेंगे। शर्त को मंज़ूरी के साथ ही दर्ज कर लेने से दोनों बाद में अलग नहीं होते।",
          "hi-en":
            "Nahin. Kisi badlaav ki shart par approve kiya gaya sample conditional approval hai, aur wo badlaav khud abhi bhi pakka hona baaki hai. Poochiye ki wo kaise dikhaya jaayega — naya swatch, lab dip ya strike-off — aur kya bulk chalne se pehle aap use dekhenge. Shart ko approval ke saath hi record kar lene se dono baad mein alag nahin hote.",
        },
      },
      {
        question: {
          en: "What should I check when the bulk arrives?",
          hi: "बल्क माल पहुँचने पर क्या जाँचना चाहिए?",
          "hi-en": "Bulk maal pahunchne par kya jaanchna chahiye?",
        },
        answer: {
          en: "Check against the approved sample itself rather than a photograph or a memory of it, and check across the lot rather than the first roll or the top of the stack. Look at the properties you agreed to hold — composition, weight, width, shade, finish — and note what you find while the consignment is still intact. A record made on arrival is far easier to act on than one assembled after the fabric has been cut.",
          hi: "जाँच तस्वीर या याददाश्त से नहीं, मंज़ूर सैंपल से कीजिए, और पूरे लॉट में कीजिए — सिर्फ़ पहले थान या ढेर के ऊपरी हिस्से से नहीं। जिन बातों को सैंपल के मुताबिक़ रखना तय हुआ था — सामग्री, वज़न, चौड़ाई, शेड, फ़िनिश — उन्हें देखिए, और जो मिले उसे माल बिना छेड़े रहते हुए दर्ज कीजिए। पहुँचने पर बनाया गया रिकॉर्ड, कपड़ा कटने के बाद जोड़े गए रिकॉर्ड से कहीं ज़्यादा काम आता है।",
          "hi-en":
            "Jaanch tasveer ya yaaddasht se nahin, approved sample se kijiye, aur poore lot mein kijiye — sirf pehle than ya dher ke upari hisse se nahin. Jin baaton ko sample ke mutabik rakhna tay hua tha — composition, weight, width, shade, finish — unhe dekhiye, aur jo mile use maal bina chhede rehte hue record kijiye. Pahunchne par banaya gaya record, kapda katne ke baad jode gaye record se kahin zyada kaam aata hai.",
        },
      },
      {
        question: {
          en: "What should I do if the bulk does not match the sample?",
          hi: "अगर बल्क माल सैंपल से मेल न खाए तो क्या करें?",
          "hi-en": "Agar bulk maal sample se mel na khaaye to kya karein?",
        },
        answer: {
          en: "Raise it early, before the fabric is cut or processed further, and raise it with evidence: the approved sample, the product code both sides agreed, photographs of the lot, and a note of what differs and by how much. A specific difference measured against a recorded specification can be discussed and settled. A general impression that the goods are not right, weeks after delivery, usually cannot.",
          hi: "जल्दी उठाइए — कपड़ा कटने या आगे प्रोसेस होने से पहले — और सबूत के साथ उठाइए: मंज़ूर सैंपल, दोनों पक्षों का तय किया प्रोडक्ट कोड, लॉट की तस्वीरें, और यह नोट कि क्या फ़र्क़ है और कितना। दर्ज स्पेसिफ़िकेशन के सामने नापा गया ठोस फ़र्क़ बातचीत से सुलझ सकता है। डिलीवरी के हफ़्तों बाद दी गई यह आम राय कि माल ठीक नहीं है, आम तौर पर नहीं सुलझती।",
          "hi-en":
            "Jaldi uthaiye — kapda katne ya aage process hone se pehle — aur saboot ke saath uthaiye: approved sample, dono taraf ka tay kiya product code, lot ki tasveerein, aur yeh note ki kya farak hai aur kitna. Record ki gayi specification ke saamne naapa gaya thos farak baatcheet se suljh sakta hai. Delivery ke hafton baad di gayi yeh aam raay ki maal theek nahin hai, aam taur par nahin sulajhti.",
        },
      },
    ],
  },
];

const WHATSAPP_INTRO: Record<Lang, (title: string) => string> = {
  en: (t) => `Hi Vidhi Fabrics, I read “${t}”. I would like to discuss my sourcing requirements.`,
  hi: (t) =>
    `नमस्ते विधि फैब्रिक्स, मैंने “${t}” पढ़ा। मैं अपनी सोर्सिंग ज़रूरतों पर बात करना चाहता/चाहती हूँ।`,
  "hi-en": (t) =>
    `Hi Vidhi Fabrics, maine “${t}” padha. Main apni sourcing requirements discuss karna chahta/chahti hoon.`,
};

export function articleWhatsAppUrl(article: JournalArticle, lang: Lang) {
  const message = article.whatsAppMessage?.[lang] ?? WHATSAPP_INTRO[lang](article.title[lang]);
  return whatsAppUrl(message);
}

export function readingMinutes(article: JournalArticle, lang: Lang) {
  const closing = article.closing;
  const text = [
    article.introduction[lang],
    ...article.sections.flatMap((s) => [
      s.heading[lang],
      ...s.paragraphs[lang],
      ...(s.checklist?.[lang] ?? []),
    ]),
    ...(closing ? [closing.heading[lang], closing.intro[lang], ...closing.checklist[lang]] : []),
    ...(article.faq?.flatMap((f) => [f.question[lang], f.answer[lang]]) ?? []),
  ].join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}
