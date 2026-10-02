import type { Lang } from "@/content/translations";

/**
 * Copy for /about and /hi/about.
 *
 * Kept inside the claim rules in BRAND.md: manufacturer and wholesaler, some
 * lines made in-house without naming which, no founding year (none has been
 * confirmed), no capacity or export figures, no price, MOQ or timing claims.
 * The disambiguation line itself lives in `business.ts` (DISAMBIGUATION) so
 * the page, the structured data and llms.txt cannot drift apart.
 */
export type AboutSection = {
  heading: string;
  paragraphs: string[];
  links?: { label: string; href: string }[];
};

export type AboutCopy = {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  lede: string;
  sections: AboutSection[];
  disambiguationHeading: string;
  disambiguationNote: string;
  contactHeading: string;
  whatsAppLabel: string;
  emailLabel: string;
  hoursLabel: string;
  addressLabel: string;
  whatsAppMessage: string;
  breadcrumbHome: string;
  breadcrumbAbout: string;
};

export const ABOUT_COPY: Record<Lang, AboutCopy> = {
  en: {
    metaTitle: "About Vidhi Fabrics | Surat Manufacturer and Wholesaler",
    metaDescription:
      "Vidhi Fabrics is a family-run manufacturer and wholesaler of polyester sarees and dress material at Golden Point, Ring Road, Surat. Led by founder and CEO Dinesh Chhabra.",
    kicker: "About Vidhi Fabrics",
    title: "A family textile business in the Surat market",
    lede: "Vidhi Fabrics is a manufacturer and wholesaler in Surat, Gujarat. We make some lines in-house and supply the rest from Surat’s wider textile market, selling polyester sarees and dress material in bulk to wholesalers, retailers, resellers and boutiques.",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "Vidhi Fabrics is a family business that has grown up inside Surat’s textile trade. We work from our shop at Golden Point on Ring Road, Begumpura, in the middle of the city’s wholesale market.",
          "Because we are both a manufacturer and a wholesaler, one business answers for your order. We make some lines ourselves and source the rest from the mills, weavers and finishers we work with across Surat, so you do not have to deal with each of them separately.",
        ],
      },
      {
        heading: "Who leads it",
        paragraphs: [
          "Dinesh Chhabra is the founder and CEO of Vidhi Fabrics. He signs the buyer guides on our Surat Fabric Desk, which set out how we think about specifications, samples and wholesale orders: practical answers to the questions buyers ask before they commit.",
        ],
        links: [{ label: "Read the Surat Fabric Desk", href: "/blog" }],
      },
      {
        heading: "What we supply, and to whom",
        paragraphs: [
          "Our main categories are polyester sarees and dress material, including unstitched suits. We sell in bulk to wholesalers, retailers, resellers and boutiques.",
          "Most of our buyers are in North India, in Punjab, Haryana and Rajasthan, and we also supply buyers in Madhya Pradesh.",
        ],
        links: [
          { label: "Polyester sarees wholesale", href: "/polyester-sarees-wholesale-surat" },
          { label: "Dress material wholesale", href: "/dress-material-wholesale-surat" },
        ],
      },
    ],
    disambiguationHeading: "Which Vidhi Fabrics this is",
    disambiguationNote:
      "If you are not sure you are speaking to us, check the WhatsApp number below against the one you were given.",
    contactHeading: "Contact",
    whatsAppLabel: "WhatsApp",
    emailLabel: "Email",
    hoursLabel: "Hours",
    addressLabel: "Address",
    whatsAppMessage:
      "Hi Vidhi Fabrics, I would like to know more about your sarees and dress material.",
    breadcrumbHome: "Vidhi Fabrics",
    breadcrumbAbout: "About",
  },
  hi: {
    metaTitle: "विधि फैब्रिक्स के बारे में | सूरत के निर्माता और थोक विक्रेता",
    metaDescription:
      "विधि फैब्रिक्स गोल्डन पॉइंट, रिंग रोड, सूरत का एक पारिवारिक कारोबार है — पॉलिएस्टर साड़ियों और ड्रेस मटेरियल के निर्माता और थोक विक्रेता। संस्थापक और सीईओ: दिनेश छाबड़ा।",
    kicker: "विधि फैब्रिक्स के बारे में",
    title: "सूरत के कपड़ा बाज़ार का एक पारिवारिक कारोबार",
    lede: "विधि फैब्रिक्स सूरत, गुजरात के निर्माता और थोक विक्रेता हैं। कुछ लाइनें हम खुद बनाते हैं और बाक़ी सूरत के बड़े कपड़ा बाज़ार से सप्लाई करते हैं — थोक विक्रेताओं, रिटेलरों, रीसेलरों और बुटीक को बल्क में पॉलिएस्टर साड़ियाँ और ड्रेस मटेरियल।",
    sections: [
      {
        heading: "हम कौन हैं",
        paragraphs: [
          "विधि फैब्रिक्स एक पारिवारिक कारोबार है, जो सूरत के कपड़ा व्यापार के बीच ही पला-बढ़ा है। हमारा काम रिंग रोड, बेगमपुरा के गोल्डन पॉइंट में हमारी दुकान से चलता है — शहर के थोक बाज़ार के बीचोंबीच।",
          "हम निर्माता भी हैं और थोक विक्रेता भी, इसलिए आपके ऑर्डर की ज़िम्मेदारी एक ही कारोबार की रहती है। कुछ लाइनें हम खुद बनाते हैं और बाक़ी सूरत की उन मिलों, बुनकरों और फ़िनिशरों से लेते हैं जिनके साथ हम काम करते हैं — आपको हर एक से अलग-अलग बात नहीं करनी पड़ती।",
        ],
      },
      {
        heading: "कारोबार की कमान",
        paragraphs: [
          "दिनेश छाबड़ा विधि फैब्रिक्स के संस्थापक और सीईओ हैं। हमारे सूरत फैब्रिक डेस्क की खरीदार गाइड उन्हीं के नाम से आती हैं — स्पेसिफ़िकेशन, सैंपल और थोक ऑर्डर पर हमारी सोच, यानी उन सवालों के सीधे जवाब जो खरीदार ऑर्डर पक्का करने से पहले पूछते हैं।",
        ],
        links: [{ label: "सूरत फैब्रिक डेस्क पढ़िए", href: "/blog" }],
      },
      {
        heading: "हम क्या सप्लाई करते हैं, और किसे",
        paragraphs: [
          "हमारी मुख्य कैटेगरी पॉलिएस्टर साड़ियाँ और ड्रेस मटेरियल हैं, अनस्टिच्ड सूट समेत। हम थोक विक्रेताओं, रिटेलरों, रीसेलरों और बुटीक को बल्क में सप्लाई करते हैं।",
          "हमारे ज़्यादातर खरीदार उत्तर भारत में हैं — पंजाब, हरियाणा और राजस्थान में — और मध्य प्रदेश के खरीदारों को भी हम सप्लाई करते हैं।",
        ],
        links: [
          { label: "पॉलिएस्टर साड़ियाँ (थोक)", href: "/polyester-sarees-wholesale-surat" },
          { label: "ड्रेस मटेरियल (थोक)", href: "/dress-material-wholesale-surat" },
        ],
      },
    ],
    disambiguationHeading: "यह कौन-सा विधि फैब्रिक्स है",
    disambiguationNote:
      "अगर पक्का न हो कि आप हमसे ही बात कर रहे हैं, तो आपको दिया गया नंबर नीचे लिखे व्हाट्सएप नंबर से मिला लीजिए।",
    contactHeading: "संपर्क",
    whatsAppLabel: "व्हाट्सएप",
    emailLabel: "ईमेल",
    hoursLabel: "समय",
    addressLabel: "पता",
    whatsAppMessage:
      "नमस्ते विधि फैब्रिक्स, मैं आपकी साड़ियों और ड्रेस मटेरियल के बारे में और जानना चाहता/चाहती हूँ।",
    breadcrumbHome: "विधि फैब्रिक्स",
    breadcrumbAbout: "हमारे बारे में",
  },
  "hi-en": {
    metaTitle: "Vidhi Fabrics ke baare mein | Surat ke manufacturer aur wholesaler",
    metaDescription:
      "Vidhi Fabrics Golden Point, Ring Road, Surat ka ek family business hai — polyester sarees aur dress material ke manufacturer aur wholesaler. Founder aur CEO: Dinesh Chhabra.",
    kicker: "Vidhi Fabrics ke baare mein",
    title: "Surat ke kapda bazaar ka ek family business",
    lede: "Vidhi Fabrics Surat, Gujarat ke manufacturer aur wholesaler hain. Kuch lines hum khud banate hain aur baaki Surat ke bade textile market se supply karte hain — wholesalers, retailers, resellers aur boutiques ko bulk mein polyester sarees aur dress material.",
    sections: [
      {
        heading: "Hum kaun hain",
        paragraphs: [
          "Vidhi Fabrics ek family business hai, jo Surat ke textile trade ke beech hi pala-badha hai. Hamara kaam Ring Road, Begumpura ke Golden Point mein hamari dukaan se chalta hai — sheher ke wholesale market ke beechon-beech.",
          "Hum manufacturer bhi hain aur wholesaler bhi, isliye aapke order ki zimmedari ek hi business ki rehti hai. Kuch lines hum khud banate hain aur baaki Surat ki un mills, weavers aur finishers se lete hain jinke saath hum kaam karte hain — aapko har ek se alag-alag baat nahin karni padti.",
        ],
      },
      {
        heading: "Business ki kamaan",
        paragraphs: [
          "Dinesh Chhabra Vidhi Fabrics ke founder aur CEO hain. Hamare Surat Fabric Desk ki buyer guides unhi ke naam se aati hain — specification, sample aur wholesale order par hamari soch, yaani un sawalon ke seedhe jawab jo buyers order pakka karne se pehle poochte hain.",
        ],
        links: [{ label: "Surat Fabric Desk padhiye", href: "/blog" }],
      },
      {
        heading: "Hum kya supply karte hain, aur kise",
        paragraphs: [
          "Hamari main categories polyester sarees aur dress material hain, unstitched suits samet. Hum wholesalers, retailers, resellers aur boutiques ko bulk mein supply karte hain.",
          "Hamare zyadatar buyers North India mein hain — Punjab, Haryana aur Rajasthan mein — aur Madhya Pradesh ke buyers ko bhi hum supply karte hain.",
        ],
        links: [
          { label: "Polyester sarees wholesale", href: "/polyester-sarees-wholesale-surat" },
          { label: "Dress material wholesale", href: "/dress-material-wholesale-surat" },
        ],
      },
    ],
    disambiguationHeading: "Yeh kaun sa Vidhi Fabrics hai",
    disambiguationNote:
      "Agar pakka na ho ki aap humse hi baat kar rahe hain, to aapko diya gaya number neeche likhe WhatsApp number se mila lijiye.",
    contactHeading: "Contact",
    whatsAppLabel: "WhatsApp",
    emailLabel: "Email",
    hoursLabel: "Timing",
    addressLabel: "Address",
    whatsAppMessage:
      "Hi Vidhi Fabrics, main aapki sarees aur dress material ke baare mein aur jaanna chahta/chahti hoon.",
    breadcrumbHome: "Vidhi Fabrics",
    breadcrumbAbout: "About",
  },
};
