import cotton from "@/assets/fabric-cotton-linen.jpg";
import jacquard from "@/assets/fabric-katan-jacquard.jpg";
import organza from "@/assets/fabric-beaded-organza.jpg";

export type JournalArticle = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  introduction: string;
  sections: { heading: string; paragraphs: string[]; checklist?: string[] }[];
};

export const JOURNAL: JournalArticle[] = [
  {
    slug: "buying-dress-material-wholesale",
    category: "Wholesale buying",
    title: "Buying dress material wholesale? Here’s what to check first.",
    excerpt:
      "From fabric details to minimum quantities, know what to ask before placing your first order.",
    image: cotton,
    imageAlt: "Cream fabric folded to show its weave and texture",
    introduction:
      "A useful wholesale enquiry starts with the customer you are buying for. Before choosing a catalogue, write down the type of shop you run, the price range your customers usually buy, and the occasions you want to serve. This gives your supplier a clearer brief and gives you a better way to judge the options. Use the following checks to turn an attractive product photograph into an order you understand.",
    sections: [
      {
        heading: "Start with a buying brief",
        paragraphs: [
          "Decide whether you need everyday dress material, a festive selection, or something for a particular customer request. Include your delivery city, approximate quantity and required arrival date. If you have a reference image, explain what you like about it: the colour, print, texture or overall look. A reference alone does not tell a supplier which details are essential.",
          "Separate your preferred buying price from your intended selling price. Ask what is included in the quotation before comparing it with another offer. A short written brief is easier to revisit than a long series of disconnected messages.",
        ],
      },
      {
        heading: "Understand exactly what makes up the set",
        paragraphs: [
          "Ask for the stated composition and measurements of each component. A set may have different materials for the top, bottom and dupatta, so confirm each separately. Check whether any component is optional and whether the product is unstitched, semi-stitched or ready to wear. Do not assume the styling shown in a photograph is included in the purchase.",
        ],
        checklist: [
          "What are the product code, composition and usable measurements?",
          "Which components and accessories are included?",
          "What care instructions and product limitations should the retailer communicate?",
        ],
      },
      {
        heading: "Use the sample to answer specific questions",
        paragraphs: [
          "Ask whether a physical sample is available, what it costs and whether it represents the proposed bulk supply. Look at the fabric in ordinary lighting and examine its feel, drape, transparency and finishing. For performance requirements such as washing behaviour or colourfastness, ask what supporting information or testing is available; appearance alone cannot establish those properties.",
          "Keep a record of the sample code and approval date. If you ask for a change, obtain a revised specification or sample approval rather than relying on a verbal understanding.",
        ],
      },
      {
        heading: "Check quantities and repeat availability",
        paragraphs: [
          "Ask whether the minimum applies per design, colour, catalogue or total order. Find out whether you must purchase a full set of colourways and whether mixed selections are possible. This helps you judge whether the order fits your customers and the amount of stock you can carry.",
          "Discuss repeat orders separately. Ask which designs are currently available, which require production and what may change between batches. Treat a popular design as a replenishment option only after availability and lead time have been confirmed.",
        ],
      },
      {
        heading: "Confirm the full order before paying",
        paragraphs: [
          "Request a written summary covering quantities, prices, applicable taxes, packing, freight, payment stages and the dispatch estimate. Confirm how defects, shortages or an incorrect item should be reported and what evidence the supplier needs. Those terms should be agreed before the shipment, not worked out after a problem.",
          "For your first purchase, consider a manageable selection that lets you learn which products your customers actually choose. Record what sells, what generates questions and what remains unsold. That record can make your next sourcing brief more precise.",
        ],
        checklist: [
          "Save the final quotation and approved product details together.",
          "Confirm the delivery address and receiving contact.",
          "Agree how substitutions or delays will be communicated.",
        ],
      },
    ],
  },
  {
    slug: "why-similar-sarees-have-different-prices",
    category: "Product knowledge",
    title: "Why two similar-looking sarees can have different prices",
    excerpt: "A closer look at how fabric, finishing and workmanship can influence a quote.",
    image: jacquard,
    imageAlt: "Rust-red jacquard fabric with intricate woven motifs",
    introduction:
      "Two sarees can look close in a catalogue and still be different buying propositions. Rather than assuming the higher quote is better or the lower quote is a bargain, ask the supplier to explain the specification behind each price. Your goal is to compare the actual products and order terms. Here is a practical way to structure that conversation before choosing a range for your shop.",
    sections: [
      {
        heading: "Compare the fabric description first",
        paragraphs: [
          "Ask for the stated fibre composition, construction and measurements of both products. Descriptive names and styling language are not a complete specification. If a particular fibre content is essential to your purchase, ask what documentation supports that description rather than drawing a conclusion from the shine or feel of a photograph.",
          "Put the answers side by side. A useful comparison starts with equivalent information: the saree length and width, whether a blouse piece is included, and the details of any separate components. If a specification is missing, mark it as unknown and ask for clarification.",
        ],
      },
      {
        heading: "Look closely at the work and finishing",
        paragraphs: [
          "Request close-up photographs of the border, the body, the reverse and the areas carrying embellishment. Ask which elements are woven, printed, machine embroidered, hand finished or attached separately. Do not infer a production method solely from a product name. Ask the supplier to describe the work used in that particular item.",
          "Where a sample is available, examine the edges, joins and finishing. Note any details your customers are likely to notice or ask about. The aim is to identify meaningful differences between the products, rather than judge the entire garment from one dramatic campaign image.",
        ],
      },
      {
        heading: "Check what the photograph is selling",
        paragraphs: [
          "A styled photograph may show a stitched blouse, jewellery, a belt or other accessories. Confirm what is included in the quoted product and what is only part of the styling. Ask whether the saree is supplied in the same form shown, or whether draping, stitching or alterations are separate.",
          "Request a straightforward product video or additional images if the original presentation leaves details unclear. Where colour matching matters, discuss a physical reference or sample. Make a note of the supplier’s stated limitations before you make promises to your own customer.",
        ],
      },
      {
        heading: "Compare the commercial terms too",
        paragraphs: [
          "Make sure both quotations use the same quantity basis. One may refer to a single item while another depends on buying an entire catalogue or a larger assortment. Ask whether taxes, delivery and any customisation are included. Also confirm payment terms, dispatch estimates and the process for reporting a defective or incorrect item.",
          "Availability matters to your buying decision. Ask whether the quoted item is in stock, made to order or dependent on a future batch. A price comparison is incomplete if one option cannot meet your required arrival date.",
        ],
        checklist: [
          "Are quantities and included components comparable?",
          "Are the same costs included in both quotations?",
          "Are sample, delivery and issue-resolution terms clear?",
        ],
      },
      {
        heading: "Choose for the customer you actually serve",
        paragraphs: [
          "Once you understand the differences, decide which ones matter to your shop. Your customers may prioritise a particular look, a comfortable feel, easy styling or a familiar price range. Ask yourself which details you can explain honestly at the counter and whether the product fits the occasions your buyers shop for.",
          "Save the specifications and your observations against the product code. After selling the range, add customer questions, feedback and reorder requests. Over time, this gives you a practical buying record and a stronger basis for discussing the next collection with your supplier.",
        ],
      },
    ],
  },
  {
    slug: "sample-to-bulk-order-checklist",
    category: "Sourcing guide",
    title: "From sample to bulk order: a buyer’s checklist",
    excerpt: "The details to confirm before moving from a sample you like to a larger order.",
    image: organza,
    imageAlt: "Pale embellished fabric showing beadwork and surface detail",
    introduction:
      "Approving a sample is an important decision, but it is only one part of placing a bulk order. You also need a shared understanding of the product, quantities, timing and what happens if something changes. Keep the approved sample and the final order details connected through a clear product code. The checklist below helps you organise that handover without relying on memory or scattered chat messages.",
    sections: [
      {
        heading: "Record exactly what you approved",
        paragraphs: [
          "Create a simple approval record with the sample code, supplier, date, photographs and agreed specification. Include the composition, dimensions, colour reference, finish and components relevant to your purchase. If the supplier uses a different code, record both so that the sample and the quotation can be matched.",
          "List any requested changes separately. A sample approved subject to a different colour or finish is not the same as unconditional approval. Ask how those changes will be confirmed and whether you need to review a revised sample before the order proceeds.",
        ],
        checklist: [
          "Identify the approved sample and its version.",
          "Record requested changes and who confirmed them.",
          "Keep the physical reference where practical.",
        ],
      },
      {
        heading: "Agree how the bulk supply should match",
        paragraphs: [
          "Ask the supplier which characteristics can vary and how you will assess the delivery against the approved reference. Where measurements or performance matter, agree the acceptance criteria and the supporting checks in writing. Do not invent a tolerance or assume a universal standard applies to your order.",
          "If your customer needs a particular test report or specification, raise that requirement before committing. Confirm who will arrange any agreed inspection or testing, when it will happen and whether its cost is included. Ask what happens if the result does not meet the agreed requirement.",
        ],
      },
      {
        heading: "Confirm the quantity breakdown and total cost",
        paragraphs: [
          "Check the order by product code, colour and unit of sale. Be explicit about whether you are buying metres, pieces, sets or full catalogues. Confirm packing details and whether any quantity variation is allowed. Ask the supplier to flag substitutions for approval rather than assuming an alternative will be acceptable.",
          "Save a final written quotation covering product cost, applicable taxes, packing, freight and payment stages. Verify the payment instructions through your established supplier contact, particularly if they change during the conversation. Keep receipts and order references together for reconciliation.",
        ],
      },
      {
        heading: "Separate dispatch from arrival",
        paragraphs: [
          "Ask whether the promised date refers to production completion, dispatch or delivery. Record your required arrival date and discuss whether the proposed schedule can meet it. Confirm the delivery address, receiving contact and how shipment details will be shared.",
          "Agree a process for updates if production, stock availability or transport changes. If partial shipments are possible, discuss whether they suit your business and how they affect costs and payment. A clear update process helps both parties make decisions while there is still time to respond.",
        ],
      },
      {
        heading: "Prepare to receive and review the order",
        paragraphs: [
          "Before arrival, confirm the time window and process for reporting shortages, damage or specification differences. Ask what photographs, packaging records or other evidence are required. Make sure the person receiving the goods knows where to find the order summary and approved reference.",
          "On receipt, compare the delivery with the agreed order and document any concern promptly. Follow the supplier’s agreed reporting process. After the order is resolved, record product feedback, delivery experience and whether you would reorder. This gives the next purchase a clear starting point.",
        ],
        checklist: [
          "Have the approved sample and order summary ready.",
          "Check the received codes and quantities.",
          "Record issues and follow the agreed reporting window.",
        ],
      },
    ],
  },
];

export function articleWhatsAppUrl(article: JournalArticle) {
  return `https://wa.me/919825208413?text=${encodeURIComponent(`Hi Vidhi Fabrics, I read “${article.title}”. I would like to discuss my sourcing requirements.`)}`;
}

export function readingMinutes(article: JournalArticle) {
  const text = [
    article.introduction,
    ...article.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.checklist ?? [])]),
  ].join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}
