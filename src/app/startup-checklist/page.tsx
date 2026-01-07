
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { BottomNav } from '@/components/layout/bottom-nav';

const initialChecklist = {
  planning: [
    { id: 1, text: 'व्यवसाय विचार का चुनाव', details: 'हमारा विचार "Mahila Suraksha" नामक एक तकनीकी प्लेटफॉर्म है जो यौन हिंसा के खिलाफ लड़ाई में डेटा, संसाधन और समुदाय को एकीकृत करता है।', status: 'Done', notes: '' },
    { id: 2, text: 'बाजार शोध (Market Research)', details: 'भारत और विश्व स्तर पर महिलाओं की सुरक्षा से संबंधित ऐप्स, एनजीओ और सरकारी पहलों का विश्लेषण करना।', status: 'To Do', notes: '' },
    { id: 3, text: 'प्रतिस्पर्धी विश्लेषण (Competitor Analysis)', details: 'अन्य सुरक्षा ऐप्स (जैसे Safetipin, Circle of 6) की विशेषताओं और कमियों की पहचान करना।', status: 'To Do', notes: '' },
    { id: 4, text: 'व्यवसाय मॉडल तय करना', details: 'एक हाइब्रिड मॉडल: अनुदान, कॉर्पोरेट सीएसआर फंड, और प्रीमियम सुविधाएँ (यदि संभव हो) के माध्यम से राजस्व उत्पन्न करना।', status: 'To Do', notes: '' },
    { id: 5, text: 'व्यवसाय योजना लिखना (Business Plan)', details: 'एक विस्तृत दस्तावेज़ बनाना जिसमें मिशन, विजन, संचालन, मार्केटिंग और वित्तीय योजना शामिल हो।', status: 'To Do', notes: '' },
    { id: 6, text: 'लक्षित ग्राहक (Target Audience) की पहचान', details: 'मुख्य रूप से शहरी और अर्ध-शहरी क्षेत्रों में महिलाएँ, छात्र, एनजीओ और सरकारी एजेंसियाँ।', status: 'To Do', notes: '' },
    { id: 7, text: 'व्यवसाय का नाम चुनना', details: '"Mahila Suraksha" - यह नाम हमारे मिशन को स्पष्ट रूप से दर्शाता है।', status: 'Done', notes: '' },
    { id: 8, text: 'SWOT विश्लेषण (SWOT Analysis)', details: 'हमारी ताकत (डेटा-संचालित दृष्टिकोण), कमजोरियाँ (प्रारंभिक धन), अवसर (बढ़ती जागरूकता), और खतरे (प्रतिस्पर्धा) का आकलन करना।', status: 'To Do', notes: '' },
    { id: 9, text: 'वित्तीय पूर्वानुमान तैयार करना', details: 'पहले तीन वर्षों के लिए परिचालन लागत, राजस्व और लाभप्रदता का अनुमान लगाना।', status: 'To Do', notes: '' },
    { id: 10, text: 'प्रारंभिक लागत (Startup Cost) का आकलन', details: 'ऐप विकास, होस्टिंग, टीम वेतन और मार्केटिंग पर होने वाले शुरुआती खर्चों का अनुमान लगाना।', status: 'To Do', notes: '' },
  ],
  legal: [
    { id: 11, text: 'व्यवसाय संरचना चुनना', details: 'एक "Section 8 Company" (गैर-लाभकारी) या "Private Limited Company" के रूप में पंजीकरण करना, जो सामाजिक प्रभाव के निवेश के लिए उपयुक्त हो।', status: 'To Do', notes: '' },
    { id: 12, text: 'कंपनी/फर्म का पंजीकरण', details: 'कॉर्पोरेट मामलों के मंत्रालय (MCA) के साथ कंपनी का पंजीकरण करवाना।', status: 'To Do', notes: '' },
    { id: 13, text: 'ट्रेडमार्क पंजीकरण', details: '"Mahila Suraksha" नाम और लोगो के लिए ट्रेडमार्क के लिए आवेदन करना।', status: 'To Do', notes: '' },
    { id: 14, text: 'उद्योग आधार (Udyam Registration) कराना', details: 'MSME के रूप में लाभ प्राप्त करने के लिए उद्योग आधार पोर्टल पर पंजीकरण।', status: 'To Do', notes: '' },
    { id: 15, text: 'कर पंजीकरण (GST, PAN, TAN)', details: 'व्यवसाय के लिए स्थायी खाता संख्या (PAN), कर कटौती और संग्रह खाता संख्या (TAN) और GST पंजीकरण प्राप्त करना।', status: 'To Do', notes: '' },
    { id_number: 16, text: 'श्रम कानूनों के तहत पंजीकरण', details: 'कर्मचारियों के लिए PF और ESI जैसे सामाजिक सुरक्षा लाभों के लिए पंजीकरण।', status: 'To Do', notes: '' },
    { id_number: 17, text: 'लाइसेंस एवं परमिट जुटाना', details: 'IT अधिनियम और अन्य लागू नियमों के अनुसार आवश्यक लाइसेंस प्राप्त करना।', status: 'To Do', notes: '' },
    { id_number: 18, text: 'आवश्यक दस्तावेजों का नोटरीकरण', details: 'निगमन प्रमाणपत्र, एमओए, एओए जैसे सभी कानूनी दस्तावेजों को नोटरीकृत करवाना।', status: 'To Do', notes: '' },
    { id_number: 19, text: 'नियम एवं शर्तें (Terms & Conditions) बनाना', details: 'ऐप के उपयोग, उपयोगकर्ता जिम्मेदारियों और देयता सीमाओं को परिभाषित करने वाली विस्तृत शर्तें बनाना।', status: 'To Do', notes: '' },
    { id_number: 20, text: 'गोपनीयता नीति (Privacy Policy) बनाना', details: 'उपयोगकर्ता डेटा को कैसे एकत्र, उपयोग और संरक्षित किया जाएगा, यह स्पष्ट रूप से बताना, विशेषकर संवेदनशील जानकारी के लिए।', status: 'To Do', notes: '' },
  ],
  financial: [
    { id_number: 21, text: 'बैंक में करंट अकाउंट खोलना', details: 'कंपनी के नाम पर एक व्यावसायिक चालू खाता खोलना।', status: 'To Do', notes: '' },
    { id_number: 22, text: 'प्रारंभिक निवेश का प्रबंधन', details: 'संस्थापकों के योगदान या शुरुआती निवेश को कंपनी के खाते में जमा करना।', status: 'To Do', notes: '' },
    { id_number: 23, text: 'एकाउंटिंग सॉफ्टवेयर चुनना', details: 'वित्तीय लेनदेन को ट्रैक करने के लिए Zoho Books या QuickBooks जैसे सॉफ्टवेयर का चयन करना।', status: 'To Do', notes: '' },
    { id_number: 24, text: 'चार्ट ऑफ अकाउंट्स सेटअप', details: 'लेखांकन सॉफ्टवेयर में आय, व्यय, संपत्ति और देनदारियों को वर्गीकृत करना।', status: 'To Do', notes: '' },
    { id_number: 25, text: 'बजट बनाना', details: 'विभिन्न विभागों जैसे प्रौद्योगिकी, विपणन और संचालन के लिए एक विस्तृत बजट आवंटित करना।', status: 'To Do', notes: '' },
    { id_number: 26, text: 'बिलिंग एवं इनवॉइस सिस्टम सेटअप', details: 'कॉर्पोरेट भागीदारों या प्रीमियम ग्राहकों (यदि कोई हो) के लिए एक स्वचालित चालान प्रणाली स्थापित करना।', status: 'To Do', notes: '' },
    { id_number: 27, text: 'पेमेंट गेटवे से जुड़ना', details: 'दान और अन्य भुगतानों को स्वीकार करने के लिए Razorpay या Stripe जैसे पेमेंट गेटवे को ऐप में एकीकृत करना।', status: 'To Do', notes: '' },
    { id_number: 28, text: 'करों की योजना बनाना', details: 'GST और आयकर दायित्वों को समझने और योजना बनाने के लिए एक कर सलाहकार के साथ काम करना।', status: 'To Do', notes: '' },
    { id_number: 29, text: 'बीमा पॉलिसी लेना', details: 'देयता बीमा और साइबर सुरक्षा बीमा जैसी आवश्यक व्यावसायिक बीमा पॉलिसियाँ खरीदना।', status: 'To Do', notes: '' },
    { id_number: 30, text: 'ऑडिटर चुनना', details: 'वित्तीय विवरणों का ऑडिट करने और अनुपालन सुनिश्चित करने के लिए एक बाहरी ऑडिटर नियुक्त करना।', status: 'To Do', notes: '' },
  ],
  infrastructure: [
    { id_number: 31, text: 'ऑफिस/कार्यस्थल का चुनाव', details: 'एक सह-कार्यशील स्थान (co-working space) या एक छोटा कार्यालय किराए पर लेना।', status: 'To Do', notes: '' },
    { id_number: 32, text: 'इंटीरियर डिजाइन एवं सजावट', details: 'एक सुरक्षित, स्वागत योग्य और उत्पादक कार्य वातावरण बनाना।', status: 'To Do', notes: '' },
    { id_number: 33, text: 'फर्नीचर, कंप्यूटर, उपकरण खरीदना', details: 'टीम के लिए लैपटॉप, डेस्क, कुर्सियाँ और अन्य आवश्यक उपकरण खरीदना।', status: 'To Do', notes: '' },
    { id_number: 34, text: 'इंटरनेट, फोन कनेक्शन लगवाना', details: 'निर्बाध संचालन के लिए एक उच्च गति वाला इंटरनेट कनेक्शन और एक व्यावसायिक फोन लाइन प्राप्त करना।', status: 'To Do', notes: '' },
    { id_number: 35, text: 'बिजली, पानी की व्यवस्था', details: 'सुनिश्चित करना कि कार्यालय में सभी बुनियादी सुविधाएँ उपलब्ध हैं।', status: 'To Do', notes: '' },
    { id_number: 36, text: 'सुरक्षा व्यवस्था (CCTV, Guard)', details: 'भौतिक कार्यालय की सुरक्षा के लिए सीसीटीवी कैमरे और सुरक्षा गार्ड की व्यवस्था करना।', status: 'To Do', notes: '' },
    { id_number_37: 37, text: 'सफाई व्यवस्था', details: 'कार्यालय को साफ और स्वच्छ रखने के लिए एक हाउसकीपिंग सेवा किराए पर लेना।', status: 'To Do', notes: '' },
    { id_number_38: 38, text: 'स्टेशनरी खरीदना', details: 'पेन, नोटबुक, प्रिंटर पेपर जैसी कार्यालय स्टेशनरी की खरीद।', status: 'To Do', notes: '' },
    { id_number_39: 39, text: 'साइनबोर्ड लगवाना', details: 'कार्यालय के बाहर एक पेशेवर साइनबोर्ड लगाना।', status: 'To Do', notes: '' },
    { id_number_40: 40, text: 'ट्रांसपोर्ट/लॉजिस्टिक्स व्यवस्था', details: 'टीम की बैठकों या क्षेत्र के काम के लिए परिवहन विकल्पों की योजना बनाना।', status: 'To Do', notes: '' },
  ],
  team: [
    { id_number: 41, text: 'भूमिकाएँ एवं जिम्मेदारियाँ निर्धारित करना', details: 'सीईओ, सीटीओ, मार्केटिंग हेड और सामुदायिक प्रबंधक जैसी प्रमुख भूमिकाओं को परिभाषित करना।', status: 'To Do', notes: '' },
    { id_number: 42, text: 'नौकरी विवरण (Job Description) तैयार करना', details: 'प्रत्येक भूमिका के लिए स्पष्ट नौकरी विवरण लिखना, जिसमें कौशल और अनुभव की आवश्यकताएं शामिल हों।', status: 'To Do', notes: '' },
    { id_number: 43, text: 'कर्मचारियों की भर्ती', details: 'डेवलपर्स, डिजाइनरों और सामुदायिक प्रबंधकों की एक मुख्य टीम की भर्ती करना।', status: 'To Do', notes: '' },
    { id_number: 44, text: 'इंटरव्यू प्रक्रिया', details: 'तकनीकी और सांस्कृतिक फिट का आकलन करने के लिए एक संरचित साक्षात्कार प्रक्रिया स्थापित करना।', status: 'To Do', notes: '' },
    { id_number: 45, text: 'ऑफर लेटर जारी करना', details: 'चयनित उम्मीदवारों को औपचारिक प्रस्ताव पत्र भेजना।', status: 'To Do', notes: '' },
    { id_number: 46, text: 'एम्प्लॉई कॉन्ट्रैक्ट तैयार करना', details: 'रोजगार की शर्तों को रेखांकित करने वाले कानूनी रूप से मान्य अनुबंध तैयार करना।', status: 'To Do', notes: '' },
    { id_number: 47, text: 'वेतन संरचना बनाना', details: 'उद्योग मानकों के अनुसार एक प्रतिस्पर्धी वेतन और लाभ पैकेज डिजाइन करना।', status: 'To Do', notes: '' },
    { id_number: 48, text: 'टीम ओरिएंटेशन कार्यक्रम', details: 'नए कर्मचारियों को कंपनी के मिशन, संस्कृति और प्रक्रियाओं से परिचित कराना।', status: 'To Do', notes: '' },
    { id_number: 49, text: 'प्रशिक्षण (Training) कार्यक्रम', details: 'टीम के कौशल को बढ़ाने के लिए निरंतर सीखने और विकास के अवसर प्रदान करना।', status: 'To Do', notes: '' },
    { id_number: 50, text: 'टीम बिल्डिंग एक्टिविटी आयोजित करना', details: 'एक मजबूत और सहयोगी टीम संस्कृति बनाने के लिए नियमित गतिविधियों की योजना बनाना।', status: 'To Do', notes: '' },
  ],
  branding: [
    { id_number: 51, text: 'लोगो डिज़ाइन करवाना', details: 'एक पेशेवर और यादगार लोगो बनाना जो "Mahila Suraksha" के मिशन को दर्शाता हो।', status: 'To Do', notes: '' },
    { id_number: 52, text: 'वेबसाइट बनवाना', details: 'ऐप और संगठन के बारे में जानकारी प्रदान करने वाली एक लैंडिंग पेज वेबसाइट बनाना। (यह वही ऐप हो सकता है जिसे हम बना रहे हैं!)', status: 'In Progress', notes: '' },
    { id_number: 53, text: 'सोशल मीडिया अकाउंट्स बनाना', details: 'LinkedIn, Twitter, અને Instagram जैसे प्लेटफार्मों पर प्रोफाइल बनाना।', status: 'To Do', notes: '' },
    { id_number: 54, text: 'व्यवसाय कार्ड, लेटरहेड, ब्रोशर डिजाइन', details: 'पेशेवर संचार के लिए ब्रांडेड मार्केटिंग सामग्री बनाना।', status: 'To Do', notes: '' },
    { id_number: 55, text: 'SEO की योजना बनाना', details: 'खोज इंजन पर हमारी वेबसाइट और ऐप की दृश्यता बढ़ाने के लिए एक रणनीति विकसित करना।', status: 'To Do', notes: '' },
    { id_number: 56, text: 'डिजिटल मार्केटिंग रणनीति', details: 'सोशल मीडिया मार्केटिंग, कंटेंट मार्केटिंग और ईमेल अभियानों के माध्यम से उपयोगकर्ताओं तक पहुंचना।', status: 'To Do', notes: '' },
    { id_number: 57, text: 'ऑफलाइन मार्केटिंग (होर्डिंग, अखबार)', details: 'जागरूकता बढ़ाने के लिए कॉलेजों और सार्वजनिक स्थानों पर अभियान चलाना।', status: 'To Do', notes: '' },
    { id_number: 58, text: 'ग्राहक सर्वेक्षण करना', details: 'उपयोगकर्ताओं की जरूरतों और अपेक्षाओं को समझने के लिए सर्वेक्षण आयोजित करना।', status: 'To Do', notes: '' },
    { id_number: 59, text: 'प्रचार सामग्री तैयार करना', details: 'ऐप के लॉन्च के लिए प्रेस विज्ञप्ति और मीडिया किट तैयार करना।', status: 'To Do', notes: '' },
    { id_number: 60, text: 'लॉन्च इवेंट की योजना बनाना', details: 'मीडिया, प्रभावित करने वालों और संभावित भागीदारों को शामिल करते हुए एक वर्चुअल या भौतिक लॉन्च इवेंट आयोजित करना।', status: 'To Do', notes: '' },
  ],
  operations: [
    { id_number: 61, text: 'वर्कफ़्लो प्रक्रियाएँ बनाना', details: 'ऐप में घटना की रिपोर्टिंग से लेकर सामुदायिक मॉडरेशन तक की प्रक्रियाओं को परिभाषित करना।', status: 'To Do', notes: '' },
    { id_number: 62, text: 'सप्लायर/विक्रेता चुनना', details: 'होस्टिंग (Firebase), पेमेंट गेटवे (Razorpay) और अन्य तकनीकी विक्रेताओं का चयन करना।', status: 'Done', notes: '' },
    { id_number: 63, text: 'स्टॉक/इन्वेंटरी मैनेजमेंट सिस्टम', details: 'यदि हम कोई भौतिक उत्पाद (जैसे सुरक्षा उपकरण) बेचते हैं तो इन्वेंट्री को ट्रैक करना। (अभी लागू नहीं)', status: 'To Do', notes: '' },
    { id_number: 64, text: 'गुणवत्ता नियंत्रण (Quality Control) प्रक्रियाएँ', details: 'ऐप में बग-मुक्त और उच्च-गुणवत्ता वाला उपयोगकर्ता अनुभव सुनिश्चित करने के लिए परीक्षण प्रक्रियाएँ स्थापित करना।', status: 'In Progress', notes: '' },
    { id_number: 65, text: 'कस्टमर सपोर्ट सिस्टम सेटअप', details: 'उपयोगकर्ताओं के प्रश्नों और मुद्दों को हल करने के लिए एक ईमेल या चैट-आधारित समर्थन प्रणाली स्थापित करना।', status: 'To Do', notes: '' },
    { id_number: 66, text: 'शिकायत निवारण प्रक्रिया', details: 'उपयोगकर्ता की शिकायतों को संभालने के लिए एक स्पष्ट और पारदर्शी प्रक्रिया बनाना।', status: 'To Do', notes: '' },
    { id_number: 67, text: 'डिलीवरी/लॉजिस्टिक्स पार्टनर चुनना', details: 'यदि कोई भौतिक सामान शामिल है। (अभी लागू नहीं)', status: 'To Do', notes: '' },
    { id_number: 68, text: 'सप्लाई चेन मैनेजमेंट', details: 'यदि कोई भौतिक सामान शामिल है। (अभी लागू नहीं)', status: 'To Do', notes: '' },
    { id_number: 69, text: 'रिपोर्टिंग सिस्टम सेटअप', details: 'ऐप उपयोग, KPI और वित्तीय प्रदर्शन को ट्रैक करने के लिए एडमिन पैनल में डैशबोर्ड बनाना।', status: 'In Progress', notes: '' },
    { id_number: 70, text: 'डेटा बैकअप एवं सुरक्षा व्यवस्था', details: 'Firebase के माध्यम से नियमित डेटा बैकअप और पुनर्प्राप्ति प्रक्रियाओं को कॉन्फ़िगर करना।', status: 'To Do', notes: '' },
  ],
  technology: [
    { id_number: 71, text: 'हार्डवेयर एवं सॉफ्टवेयर खरीद', details: 'टीम के लिए लैपटॉप और आवश्यक सॉफ्टवेयर लाइसेंस खरीदना।', status: 'To Do', notes: '' },
    { id_number: 72, text: 'ईमेल, डोमेन सेटअप', details: 'हमारे डोमेन (@mahilasuraksha.org) के लिए Google Workspace या Zoho Mail के माध्यम से व्यावसायिक ईमेल सेट करना।', status: 'To Do', notes: '' },
    { id_number: 73, text: 'क्लाउड स्टोरेज सेटअप', details: 'दस्तावेजों और फाइलों को संग्रहीत करने के लिए Google Drive या OneDrive का उपयोग करना।', status: 'To Do', notes: '' },
    { id_number: 74, text: 'साइबर सुरक्षा (Cybersecurity) व्यवस्था', details: 'Firebase सुरक्षा नियमों, App Check और अन्य उपायों के माध्यम से ऐप और उपयोगकर्ता डेटा को सुरक्षित करना।', status: 'In Progress', notes: '' },
    { id_number: 75, text: 'CRM सॉफ्टवेयर इंस्टॉल करना', details: 'भागीदारों, दाताओं और प्रमुख हितधारकों के साथ संबंधों को प्रबंधित करने के लिए HubSpot या Zoho CRM का उपयोग करना।', status: 'To Do', notes: '' },
    { id_number: 76, text: 'प्रोजेक्ट मैनेजमेंट टूल (Asana, Trello)', details: 'विकास और अन्य कार्यों को ट्रैक करने के लिए एक परियोजना प्रबंधन उपकरण का उपयोग करना।', status: 'To Do', notes: '' },
    { id_number: 77, text: 'कम्युनिकेशन टूल (Slack, Zoom)', details: 'टीम के भीतर संचार के लिए Slack और वीडियो कॉन्फ्रेंसिंग के लिए Zoom का उपयोग करना।', status: 'To Do', notes: '' },
    { id_number: 78, text: 'डेटा एनालिटिक्स टूल', details: 'ऐप उपयोग पैटर्न को समझने के लिए Firebase Analytics और Google Analytics को एकीकृत करना।', status: 'To Do', notes: '' },
    { id_number: 79, text: 'मोबाइल ऐप बनाना (यदि आवश्यक हो)', details: 'Next.js PWA जिसे हम बना रहे हैं वह एक शानदार शुरुआत है। भविष्य में हम एक नेटिव ऐप भी बना सकते हैं।', status: 'In Progress', notes: '' },
    { id_number: 80, text: 'ऑटोमेशन टूल (Automation Tools) लगाना', details: 'ईमेल मार्केटिंग और सोशल मीडिया पोस्टिंग जैसे दोहराए जाने वाले कार्यों को स्वचालित करने के लिए Zapier या Make जैसे टूल का उपयोग करना।', status: 'To Do', notes: '' },
  ],
  growth: [
    { id_number: 81, text: 'नेटवर्किंग इवेंट में भाग लेना', details: 'जागरूकता बढ़ाने और संबंध बनाने के لیے सामाजिक प्रभाव और प्रौद्योगिकी सम्मेलनों में भाग लेना।', status: 'To Do', notes: '' },
    { id_number: 82, text: 'संभावित ग्राहकों की सूची बनाना', details: 'एनजीओ, कॉलेजों और कॉर्पोरेट भागीदारों की एक सूची बनाना जिनसे संपर्क किया जा सके।', status: 'To Do', notes: '' },
    { id_number: 83, text: 'बिक्री रणनीति बनाना', details: 'कॉर्पोरेट सीएसआर भागीदारी हासिल करने के लिए एक पिच डेक और रणनीति बनाना।', status: 'To Do', notes: '' },
    { id_number: 84, text: 'पार्टनरशिप/संयुक्त उद्यम की तलाश', details: 'पहुंच बढ़ाने के लिए मौजूदा महिला अधिकार संगठनों के साथ सहयोग करना।', status: 'To Do', notes: '' },
    { id_number: 85, text: 'निवेशकों से संपर्क (यदि आवश्यक हो)', details 'सामाजिक प्रभाव वाले निवेशकों और उद्यम पूंजी फर्मों के लिए एक पिच तैयार करना।', status: 'To Do', notes: '' },
    { id_number: 86, text: 'नए उत्पाद/सेवा विकास की योजना', details: 'ऐप में AI-संचालित जोखिम मूल्यांकन या शैक्षिक चैटबॉट जैसी नई सुविधाएँ जोड़ना।', status: 'To Do', notes: '' },
    { id_number: 87, text: 'ग्राहक प्रतिधारण (Customer Retention) रणनीति', details: 'उपयोगकर्ताओं को पुश नोटिफिकेशन, न्यूजलेटर और नई सामग्री के माध्यम से जोड़े रखना।', status: 'To Do', notes: '' },
    { id_number: 88, text: 'फीडबैक सिस्टम बनाना', details: 'ऐप में एक सुविधा बनाना ताकि उपयोगकर्ता आसानी से फीडबैक और सुविधा अनुरोध सबमिट कर सकें।', status: 'Done', notes: '' },
    { id_number: 89, text: 'बाजार विस्तार की योजना', details: 'अन्य देशों या क्षेत्रों में ऐप को अनुकूलित और लॉन्च करने की योजना बनाना।', status: 'To Do', notes: '' },
    { id_number: 90, text: 'व्यवसाय की समीक्षा एवं विश्लेषण', details: 'हमारे लक्ष्यों के मुकाबले प्रगति को ट्रैक करने के लिए नियमित रूप से KPI और व्यावसायिक मैट्रिक्स की समीक्षा करना।', status: 'To Do', notes: '' },
  ],
  management: [
    { id_number: 91, text: 'मासिक वित्तीय समीक्षा', details: 'यह सुनिश्चित करने के लिए कि हम बजट के भीतर हैं, हर महीने आय और व्यय की समीक्षा करना।', status: 'To Do', notes: '' },
    { id_number: 92, text: 'कर्मचारी प्रदर्शन समीक्षा', details: 'कर्मचारियों को प्रतिक्रिया देने और उनके विकास में मदद करने के लिए नियमित प्रदर्शन समीक्षा आयोजित करना।', status: 'To Do', notes: '' },
    { id_number: 93, text: 'बाजार रुझानों पर नजर रखना', details: 'महिला सुरक्षा और प्रौद्योगिकी में नवीनतम रुझानों और नवाचारों से अवगत रहना।', status: 'To Do', notes: '' },
    { id_number: 94, text: 'नियमों एवं कानूनों में बदलावों पर अद्यतन रहना', details: 'डेटा गोपनीयता और गैर-लाभकारी अनुपालन से संबंधित कानूनों में बदलावों पर नजर रखना।', status: 'To Do', notes: '' },
    { id_number: 95, text: 'टीम मीटिंग्स नियमित करना', details: 'यह सुनिश्चित करने के लिए कि हर कोई संरेखित है, दैनिक स्टैंड-अप और साप्ताहिक टीम मीटिंग आयोजित करना।', status: 'To Do', notes: '' },
    { id_number: 96, text: 'आपातकालीन योजना (Emergency Plan) बनाना', details: 'डेटा उल्लंघन या ऐप के बंद होने जैसी अप्रत्याशित घटनाओं के लिए एक योजना बनाना।', status: 'To Do', notes: '' },
    { id_number: 97, text: 'व्यवसाय बीमा की समीक्षा', details: 'यह सुनिश्चित करने के लिए कि हमारी कवरेज पर्याप्त है, सालाना बीमा पॉलिसियों की समीक्षा करना।', status: 'To Do', notes: '' },
    { id_number: 98, text: 'प्रौद्योगिकी अपग्रेड', details: 'हमारे ऐप और आंतरिक प्रणालियों को नवीनतम और सबसे सुरक्षित प्रौद्योगिकी के साथ अद्यतन रखना।', status: 'To Do', notes: '' },
    { id_number: 99, text: 'सामाजिक उत्तरदायित्व (CSR) गतिविधियाँ', details: 'स्थानीय समुदायों में स्वेच्छा से काम करना और अन्य सामाजिक कारणों का समर्थन करना।', status: 'To Do', notes: '' },
    { id_number: 100, text: 'व्यवसाय वार्षिकोत्सव मनाना!', details: 'टीम की कड़ी मेहनत और हमारी उपलब्धियों को पहचानने के लिए मील के पत्थर का जश्न मनाना।', status: 'To Do', notes: '' },
  ],
};


type Task = {
  id: number;
  text: string;
  details: string;
  status: 'To Do' | 'In Progress' | 'Done';
  notes: string;
};

type Checklist = {
  [key: string]: Task[];
};

export default function StartupChecklistPage() {
  const [checklist, setChecklist] = useState<Checklist>(initialChecklist);

  const handleStatusChange = (section: string, taskId: number, newStatus: Task['status']) => {
    setChecklist(prev => ({
      ...prev,
      [section]: prev[section].map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ),
    }));
  };

  const handleNotesChange = (section: string, taskId: number, newNotes: string) => {
    setChecklist(prev => ({
      ...prev,
      [section]: prev[section].map(task => 
        task.id === taskId ? { ...task, notes: newNotes } : task
      ),
    }));
  };

  const sectionTitles: { [key: string]: string } = {
    planning: '1. योजना एवं शोध (Planning & Research)',
    legal: '2. कानूनी प्रक्रिया (Legal Formalities)',
    financial: '3. वित्तीय व्यवस्था (Financial Setup)',
    infrastructure: '4. बुनियादी ढाँचा (Infrastructure)',
    team: '5. टीम निर्माण (Team Building)',
    branding: '6. ब्रांडिंग एवं मार्केटिंग (Branding & Marketing)',
    operations: '7. संचालन (Operations)',
    technology: '8. प्रौद्योगिकी (Technology)',
    growth: '9. व्यापार विकास (Business Growth)',
    management: '10. निरंतर प्रबंधन (Ongoing Management)',
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center p-4">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">Startup Checklist</h1>
      </header>

      <main className="p-4 space-y-4">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {Object.entries(checklist).map(([sectionKey, tasks]) => (
            <AccordionItem key={sectionKey} value={sectionKey} className="bg-secondary/30 rounded-lg border-border">
              <AccordionTrigger className="p-4 text-lg font-semibold hover:no-underline">
                {sectionTitles[sectionKey]}
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0">
                <div className="space-y-4">
                  {tasks.map(task => (
                    <Card key={task.id} className="bg-background/50 border-border">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-base leading-tight">{task.id}. {task.text}</h3>
                          <Select value={task.status} onValueChange={(value: Task['status']) => handleStatusChange(sectionKey, task.id, value)}>
                            <SelectTrigger className="w-[120px] bg-secondary/50 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="To Do">To Do</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Done">Done</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                          <span className="font-semibold not-italic">हमारे ऐप के लिए इसका मतलब है:</span> {task.details}
                        </p>
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground">Notes</label>
                          <Textarea 
                            placeholder="Add notes here..."
                            className="mt-1 bg-secondary/50 text-sm"
                            value={task.notes}
                            onChange={(e) => handleNotesChange(sectionKey, task.id, e.target.value)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>

      <BottomNav />
    </div>
  );
}
