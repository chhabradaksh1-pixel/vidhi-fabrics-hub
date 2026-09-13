import cotton from "@/assets/fabric-cotton-linen.jpg";
import jacquard from "@/assets/fabric-katan-jacquard.jpg";
import organza from "@/assets/fabric-beaded-organza.jpg";
import type { Lang } from "@/content/translations";

/** A string carried in all three site languages. */
export type Localized = Record<Lang, string>;
/** A list of strings carried in all three site languages. */
export type LocalizedList = Record<Lang, string[]>;

export type JournalSection = {
  heading: Localized;
  paragraphs: LocalizedList;
  checklist?: LocalizedList;
};

export type JournalArticle = {
  slug: string;
  image: string;
  imageAlt: Localized;
  category: Localized;
  title: Localized;
  excerpt: Localized;
  introduction: Localized;
  sections: JournalSection[];
};

export const JOURNAL: JournalArticle[] = [
  {
    slug: "buying-dress-material-wholesale",
    image: cotton,
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
          ],
          hi: [
            "तय कीजिए कि आपको रोज़मर्रा का ड्रेस मटेरियल चाहिए, त्योहारी सिलेक्शन, या किसी ख़ास ग्राहक की माँग के लिए कुछ। अपना डिलीवरी शहर, अनुमानित मात्रा और पहुँचने की ज़रूरी तारीख़ शामिल कीजिए। अगर कोई रेफ़रेंस तस्वीर है, तो बताइए कि उसमें आपको क्या पसंद है — रंग, प्रिंट, बनावट या पूरा लुक। अकेली तस्वीर सप्लायर को यह नहीं बताती कि कौन-सी बात ज़रूरी है।",
            "अपनी खरीद कीमत और बिक्री कीमत अलग-अलग रखिए। किसी दूसरे ऑफ़र से तुलना करने से पहले पूछिए कि कोटेशन में क्या-क्या शामिल है। लिखी हुई छोटी ब्रीफ़ को दोबारा देखना, बिखरे हुए लंबे मैसेज पढ़ने से कहीं आसान है।",
          ],
          "hi-en": [
            "Tay kijiye ki aapko rozmarra ka dress material chahiye, festive selection, ya kisi khaas customer ki demand ke liye kuch. Apna delivery city, approximate quantity aur arrival ki zaroori date shamil kijiye. Agar koi reference image hai, to bataiye ki usme aapko kya pasand hai — colour, print, texture ya overall look. Akeli image supplier ko yeh nahi batati ki kaun si detail zaroori hai.",
            "Apni buying price aur selling price alag-alag rakhiye. Kisi doosre offer se compare karne se pehle poochiye ki quotation mein kya kya shamil hai. Likhi hui chhoti brief ko dobara dekhna, bikhre hue lambe messages padhne se kahin aasan hai.",
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
          ],
          hi: [
            "हर हिस्से की बताई गई सामग्री और नाप माँगिए। एक सेट में टॉप, बॉटम और दुपट्टे का कपड़ा अलग-अलग हो सकता है, इसलिए हर एक की अलग पुष्टि कीजिए। देखिए कि कोई हिस्सा वैकल्पिक तो नहीं, और प्रोडक्ट अनस्टिच्ड है, सेमी-स्टिच्ड या रेडी टू वियर। यह मान लेना ठीक नहीं कि तस्वीर में दिख रही पूरी स्टाइलिंग खरीद में शामिल है।",
          ],
          "hi-en": [
            "Har component ki batayi gayi composition aur measurements maangiye. Ek set mein top, bottom aur dupatte ka fabric alag alag ho sakta hai, isliye har ek ki alag confirmation lijiye. Dekhiye ki koi component optional to nahi, aur product unstitched hai, semi-stitched ya ready to wear. Yeh maan lena theek nahi ki photograph mein dikh rahi poori styling purchase mein shamil hai.",
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
            "पूछिए कि असली सैंपल मिल सकता है या नहीं, उसकी कीमत क्या है, और क्या वह प्रस्तावित बल्क सप्लाई का सही प्रतिनिधित्व करता है। कपड़े को सामान्य रोशनी में देखिए और उसका एहसास, गिरावट, पारदर्शिता और फ़िनिशिंग जाँचिए। धुलाई या रंग की पक्काई जैसी बातों के लिए पूछिए कि कौन-सी जानकारी या जाँच उपलब्ध है; सिर्फ़ देखकर ये गुण तय नहीं किए जा सकते।",
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
  },
  {
    slug: "why-similar-sarees-have-different-prices",
    image: jacquard,
    imageAlt: {
      en: "Rust-red jacquard fabric with intricate woven motifs",
      hi: "जंग-लाल जैक्वार्ड कपड़ा, जिस पर बारीक बुने हुए मोटिफ़ हैं",
      "hi-en": "Rust-red jacquard fabric jis par bareek bune hue motifs hain",
    },
    category: {
      en: "Product knowledge",
      hi: "प्रोडक्ट की जानकारी",
      "hi-en": "Product knowledge",
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
    image: organza,
    imageAlt: {
      en: "Pale embellished fabric showing beadwork and surface detail",
      hi: "हल्के रंग का सजावटी कपड़ा, जिस पर मोती का काम और बारीकी दिख रही है",
      "hi-en": "Halke rang ka embellished fabric jis par beadwork aur detail dikh rahi hai",
    },
    category: {
      en: "Sourcing guide",
      hi: "सोर्सिंग गाइड",
      "hi-en": "Sourcing guide",
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
          ],
          hi: [
            "एक सादा मंज़ूरी-रिकॉर्ड बनाइए जिसमें सैंपल कोड, सप्लायर, तारीख़, तस्वीरें और तय स्पेसिफ़िकेशन हों। उसमें सामग्री, नाप, रंग का रेफ़रेंस, फ़िनिश और आपकी खरीद से जुड़े हिस्से शामिल कीजिए। अगर सप्लायर का कोड अलग है, तो दोनों कोड लिखिए ताकि सैंपल और कोटेशन आपस में मिलाए जा सकें।",
            "माँगे गए बदलाव अलग से लिखिए। किसी दूसरे रंग या फ़िनिश की शर्त पर मंज़ूर किया गया सैंपल, बिना शर्त मंज़ूरी नहीं होता। पूछिए कि वे बदलाव कैसे पक्के होंगे और क्या ऑर्डर आगे बढ़ने से पहले आपको नया सैंपल देखना होगा।",
          ],
          "hi-en": [
            "Ek simple approval record banaiye jisme sample code, supplier, date, photographs aur tay specification hon. Usme composition, dimensions, colour reference, finish aur aapki purchase se jude components shamil kijiye. Agar supplier ka code alag hai, to dono code likhiye taaki sample aur quotation aapas mein match ho sakein.",
            "Maange gaye changes alag se likhiye. Kisi doosre colour ya finish ki shart par approve kiya gaya sample, bina shart approval nahi hota. Poochiye ki wo changes kaise confirm honge aur kya order aage badhne se pehle aapko revised sample dekhna hoga.",
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
  return `https://wa.me/919825208413?text=${encodeURIComponent(WHATSAPP_INTRO[lang](article.title[lang]))}`;
}

export function readingMinutes(article: JournalArticle, lang: Lang) {
  const text = [
    article.introduction[lang],
    ...article.sections.flatMap((s) => [
      s.heading[lang],
      ...s.paragraphs[lang],
      ...(s.checklist?.[lang] ?? []),
    ]),
  ].join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}
