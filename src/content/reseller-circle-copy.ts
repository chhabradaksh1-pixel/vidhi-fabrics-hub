import type { Lang } from "@/content/translations";

/**
 * Copy for the Vidhi Reseller Circle (a vetted WhatsApp Community) and the
 * calls to action that point to it.
 *
 * Never publish the WhatsApp invite link anywhere on the site: members are
 * reviewed and the catalogue stays private. The join form posts to Formspree;
 * the team sends the invite on WhatsApp after review.
 *
 * Same rules as the rest of the site: no MOQ, delivery timeline, transport or
 * price claims (BRAND.md).
 */

export const CIRCLE_PATH = "/reseller-circle";

export function circleHref(lang: Lang): string {
  return lang === "hi" ? `/hi${CIRCLE_PATH}` : CIRCLE_PATH;
}

/** Short CTA block, used on the reseller and organza/net pages. */
export const CIRCLE_CTA: Record<Lang, { heading: string; body: string; button: string }> = {
  en: {
    heading: "Join the Vidhi Reseller Circle",
    body: "A private WhatsApp community for boutiques and home-based sellers: the members' catalogue and rate card, ready photos and captions, and new designs every month.",
    button: "Join the Reseller Circle",
  },
  hi: {
    heading: "विधि रीसेलर सर्कल से जुड़िए",
    body: "बुटीक और घर से बेचने वालों के लिए एक प्राइवेट व्हाट्सएप कम्युनिटी — सदस्यों का कैटलॉग और रेट कार्ड, तैयार फ़ोटो और कैप्शन, और हर महीने नई डिज़ाइनें।",
    button: "रीसेलर सर्कल से जुड़िए",
  },
  "hi-en": {
    heading: "Vidhi Reseller Circle se judiye",
    body: "Boutiques aur ghar se bechne walon ke liye ek private WhatsApp community — members ka catalogue aur rate card, ready photos aur captions, aur har mahine nayi designs.",
    button: "Reseller Circle join kijiye",
  },
};

/** One-line strip above the homepage footer. */
export const CIRCLE_STRIP: Record<Lang, { heading: string; text: string; button: string }> = {
  en: {
    heading: "The Reseller Circle",
    text: "Sell to your own customers? Join the Vidhi Reseller Circle, our private WhatsApp community for boutiques and home-based sellers.",
    button: "Join the Reseller Circle",
  },
  hi: {
    heading: "विधि रीसेलर सर्कल",
    text: "अपने ग्राहकों को बेचते हैं? विधि रीसेलर सर्कल से जुड़िए — बुटीक और घर से बेचने वालों के लिए हमारी प्राइवेट व्हाट्सएप कम्युनिटी।",
    button: "रीसेलर सर्कल से जुड़िए",
  },
  "hi-en": {
    heading: "Vidhi Reseller Circle",
    text: "Apne customers ko bechte hain? Vidhi Reseller Circle se judiye — boutiques aur ghar se bechne walon ke liye hamari private WhatsApp community.",
    button: "Reseller Circle join kijiye",
  },
};

export type CirclePageCopy = {
  metaTitle: string;
  metaDescription: string;
  breadcrumbHome: string;
  breadcrumb: string;
  breadcrumbLabel: string;
  title: string;
  lede: string;
  benefitsHeading: string;
  benefits: { title: string; body: string }[];
  whoHeading: string;
  who: string;
  howHeading: string;
  steps: string[];
  formHeading: string;
  formIntro: string;
  name: string;
  city: string;
  businessType: string;
  businessTypePlaceholder: string;
  businessTypes: { value: string; label: string }[];
  whatsapp: string;
  whatsappHint: string;
  submit: string;
  sending: string;
  required: string;
  invalidPhone: string;
  thanksHeading: string;
  thanks: string;
  error: string;
  privacy: string;
  related: string;
};

export const CIRCLE_PAGE: Record<"en" | "hi", CirclePageCopy> = {
  en: {
    metaTitle: "Vidhi Reseller Circle | WhatsApp Group for Resellers",
    metaDescription:
      "Private WhatsApp community for boutiques and home-based resellers in North India, run by Vidhi Fabrics, Surat. Catalogue, ready photos, monthly new designs.",
    breadcrumbHome: "Vidhi Fabrics",
    breadcrumb: "Reseller Circle",
    breadcrumbLabel: "Breadcrumb",
    title: "Join the Vidhi Reseller Circle",
    lede: "The Vidhi Reseller Circle is a private WhatsApp community run by Vidhi Fabrics, a Surat manufacturer and wholesaler, for boutiques and home-based resellers in North India. It is built to help you sell to your own customers. Send a request below; our team reviews every request and sends the invite on WhatsApp.",
    benefitsHeading: "What members get",
    benefits: [
      {
        title: "Private catalogue and rate card",
        body: "Current designs and the members' rate card, shared only inside the Circle.",
      },
      {
        title: "Sell-through kits",
        body: "Ready photos and captions for each design, to forward to your customers or post on your Status.",
      },
      {
        title: "Monthly new drops",
        body: "A first look at each month's new designs.",
      },
      {
        title: "#MyVidhiStory credits",
        body: "We feature members' selling stories, with credit to your boutique, shop or page.",
      },
      {
        title: "Referral programme",
        body: "Bring in other sellers you trust. The details are shared with members inside the Circle.",
      },
    ],
    whoHeading: "Who it's for",
    who: "Boutiques, home-based resellers who sell on WhatsApp and Instagram, and small shops across North India, including Punjab, Haryana, Rajasthan, Uttar Pradesh and Madhya Pradesh. Our range covers polyester sarees and dress material, with organza, net and other fabrics sourced to order through our Surat network.",
    howHeading: "How joining works",
    steps: [
      "Fill in the short form on this page.",
      "Our team reviews your request. Members are reviewed so the catalogue stays private.",
      "Once approved, we send you the invite on WhatsApp.",
    ],
    formHeading: "Request to join",
    formIntro: "Four quick details, so we can add you to the right group.",
    name: "Your name",
    city: "City",
    businessType: "Business type",
    businessTypePlaceholder: "Select one",
    businessTypes: [
      { value: "Boutique", label: "Boutique" },
      { value: "Home reseller", label: "Home reseller" },
      { value: "Shop", label: "Shop" },
      { value: "Other", label: "Other" },
    ],
    whatsapp: "WhatsApp number",
    whatsappHint: "With country code if you're outside India.",
    submit: "Request to join",
    sending: "Sending…",
    required: "Please fill this in.",
    invalidPhone: "Please enter a valid WhatsApp number.",
    thanksHeading: "Thank you",
    thanks:
      "We've received your request. Our team will review it and send you the invite on WhatsApp.",
    error:
      "Something went wrong and your request was not sent. Please try again, or message us on WhatsApp.",
    privacy: "We use these details only to review your request and contact you on WhatsApp.",
    related: "Browse our pages for resellers and boutiques:",
  },
  hi: {
    metaTitle: "विधि रीसेलर सर्कल | रीसेलर के लिए व्हाट्सएप ग्रुप",
    metaDescription:
      "उत्तर भारत के बुटीक और रीसेलरों के लिए विधि फैब्रिक्स, सूरत की प्राइवेट व्हाट्सएप कम्युनिटी। होलसेल कैटलॉग, तैयार फ़ोटो और कैप्शन, हर महीने नई डिज़ाइनें।",
    breadcrumbHome: "विधि फैब्रिक्स",
    breadcrumb: "रीसेलर सर्कल",
    breadcrumbLabel: "ब्रेडक्रंब",
    title: "विधि रीसेलर सर्कल से जुड़िए",
    lede: "विधि रीसेलर सर्कल एक प्राइवेट व्हाट्सएप कम्युनिटी है, जिसे सूरत के निर्माता और थोक विक्रेता विधि फैब्रिक्स चलाते हैं — उत्तर भारत के बुटीक और घर से बेचने वाले रीसेलरों के लिए। इसका मकसद है कि आप अपने ग्राहकों को और अच्छे से बेच सकें। नीचे फ़ॉर्म भरिए; हमारी टीम हर अनुरोध देखती है और व्हाट्सएप पर इनवाइट भेजती है।",
    benefitsHeading: "सदस्यों को क्या मिलता है",
    benefits: [
      {
        title: "प्राइवेट कैटलॉग और रेट कार्ड",
        body: "मौजूदा डिज़ाइनें और सदस्यों का रेट कार्ड — सिर्फ़ सर्कल के अंदर।",
      },
      {
        title: "बेचने के लिए तैयार किट",
        body: "हर डिज़ाइन की तैयार फ़ोटो और कैप्शन — सीधे अपने ग्राहकों को भेजिए या स्टेटस पर लगाइए।",
      },
      {
        title: "हर महीने नई डिज़ाइनें",
        body: "हर महीने आने वाली नई डिज़ाइनों की पहली झलक।",
      },
      {
        title: "#MyVidhiStory में आपका नाम",
        body: "सदस्यों की बिक्री की कहानियाँ हम आपके बुटीक, दुकान या पेज के नाम के साथ दिखाते हैं।",
      },
      {
        title: "रेफ़रल प्रोग्राम",
        body: "भरोसे वाले दूसरे विक्रेताओं को जोड़िए। पूरी जानकारी सर्कल के अंदर सदस्यों को दी जाती है।",
      },
    ],
    whoHeading: "यह किसके लिए है",
    who: "उत्तर भारत के बुटीक, व्हाट्सएप और इंस्टाग्राम पर घर से बेचने वाले रीसेलर और छोटी दुकानें — पंजाब, हरियाणा, राजस्थान, उत्तर प्रदेश और मध्य प्रदेश समेत। हमारी रेंज में पॉलिएस्टर साड़ियाँ और ड्रेस मटेरियल हैं, और सूरत के अपने नेटवर्क से हम ऑर्गेंज़ा, नेट और दूसरे कपड़े ऑर्डर पर सोर्स करते हैं।",
    howHeading: "जुड़ने का तरीका",
    steps: [
      "इस पेज पर छोटा-सा फ़ॉर्म भरिए।",
      "हमारी टीम आपका अनुरोध देखती है। कैटलॉग प्राइवेट रहे, इसलिए हर सदस्य को जाँचकर जोड़ा जाता है।",
      "मंज़ूरी मिलते ही हम व्हाट्सएप पर इनवाइट भेज देते हैं।",
    ],
    formHeading: "जुड़ने का अनुरोध भेजिए",
    formIntro: "बस चार जानकारियाँ, ताकि हम आपको सही ग्रुप में जोड़ सकें।",
    name: "आपका नाम",
    city: "शहर",
    businessType: "कारोबार का प्रकार",
    businessTypePlaceholder: "एक चुनिए",
    businessTypes: [
      { value: "Boutique", label: "बुटीक" },
      { value: "Home reseller", label: "घर से बेचने वाले रीसेलर" },
      { value: "Shop", label: "दुकान" },
      { value: "Other", label: "अन्य" },
    ],
    whatsapp: "व्हाट्सएप नंबर",
    whatsappHint: "भारत से बाहर हों तो कंट्री कोड के साथ लिखिए।",
    submit: "अनुरोध भेजिए",
    sending: "भेज रहे हैं…",
    required: "यह भरना ज़रूरी है।",
    invalidPhone: "कृपया सही व्हाट्सएप नंबर लिखिए।",
    thanksHeading: "धन्यवाद",
    thanks: "आपका अनुरोध मिल गया है। हमारी टीम इसे देखकर व्हाट्सएप पर आपको इनवाइट भेजेगी।",
    error:
      "कुछ गड़बड़ हो गई और आपका अनुरोध नहीं गया। कृपया फिर से कोशिश कीजिए, या हमें व्हाट्सएप पर मैसेज कीजिए।",
    privacy:
      "ये जानकारियाँ हम सिर्फ़ आपका अनुरोध देखने और व्हाट्सएप पर संपर्क करने के लिए इस्तेमाल करते हैं।",
    related: "रीसेलर और बुटीक के लिए हमारे पेज देखिए:",
  },
};
