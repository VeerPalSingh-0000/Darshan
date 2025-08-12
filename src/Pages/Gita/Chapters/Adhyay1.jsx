import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, BookOpenIcon, BookmarkIcon as BookmarkOutlineIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

// --- Firebase & Auth Imports ---
import { useAuth } from '../../../context/AuthContext'; // Adjust path if your structure differs
import { db } from '../../../firebase'; // Adjust path if your structure differs
import { doc, getDoc, setDoc } from 'firebase/firestore';


// Data for Chapter 1 (including 'meaning' field)
const chapter1Shlokas = [
  {
    num: 1,
    sanskrit: 'धृतराष्ट्र उवाच |\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||१||',
    hindi: 'धृतराष्ट्र बोले - हे संजय! धर्मभूमि कुरुक्षेत्र में एकत्रित, युद्ध की इच्छावाले मेरे और पाण्डु के पुत्रों ने क्या किया? ||१||',
    english: 'Dhritarashtra said: O Sanjaya, after my sons and the sons of Pandu assembled in the place of pilgrimage at Kurukshetra, desiring to fight, what did they do? ||1||',
    meaning: 'The story begins with a question born of blindness—both literal and spiritual. King Dhritarashtra, attached to his sons, reveals his biased perspective ("my sons" vs. "sons of Pandu"), setting the stage for a conflict rooted in attachment and ego.'
  },
  {
    num: 2,
    sanskrit: 'सञ्जय उवाच |\nदृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा |\nआचार्यमुपसङ्गम्य राजा वचनमब्रवीत् ||२||',
    hindi: 'संजय बोले - उस समय राजा दुर्योधन ने व्यूहरचनायुक्त पाण्डवों की सेना को देखकर और द्रोणाचार्य के पास जाकर यह वचन कहा ||२||',
    english: 'Sanjaya said: O King, after looking over the army arranged in military formation by the sons of Pandu, King Duryodhana went to his teacher and spoke the following words. ||2||',
    meaning: 'Fueled by anxiety, Duryodhana approaches his teacher, Drona. His first instinct is not courage but fear disguised as strategic assessment, highlighting the mindset of an insecure leader.'
  },
  {
    num: 3,
    sanskrit: 'पश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम् |\nव्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता ||३||',
    hindi: 'हे आचार्य! आपके बुद्धिमान् शिष्य द्रुपदपुत्र धृष्टद्युम्न द्वारा व्यूहाकार खड़ी की हुई पाण्डुपुत्रों की इस बड़ी भारी सेना को देखिए ||३||',
    english: 'O my teacher, behold the great army of the sons of Pandu, so expertly arranged by your intelligent disciple the son of Drupada. ||3||',
    meaning: 'Duryodhana subtly attempts to manipulate Drona by reminding him of his connection to Dhrishtadyumna (Drona\'s prophesied killer), trying to stoke personal resentment to ensure his teacher\'s loyalty in the upcoming battle.'
  },
  {
    num: 4,
    sanskrit: 'अत्र शूरा महेष्वासा भीमार्जुनसमा युधि |\nयुयुधानो विराटश्च द्रुपदश्च महारथः ||४||',
    hindi: 'इस सेना में बड़े-बड़े धनुषोंवाले तथा युद्ध में भीम और अर्जुन के समान शूरवीर सात्यकि और विराट तथा महारथी राजा द्रुपद हैं ||४||',
    english: 'Here in this army are many heroic bowmen equal in fighting to Bhima and Arjuna: great fighters like Yuyudhana, Virata and Drupada. ||4||',
    meaning: 'He begins listing the heroes of the Pandava army. This act of naming his enemies reveals how deeply they occupy his mind, a classic sign of a consciousness dominated by fear and opposition.'
  },
  {
    num: 5,
    sanskrit: 'धृष्टकेतुश्चेकितानः काशिराजश्च वीर्यवान् |\nपुरुजित्कुन्तिभोजश्च शैब्यश्च नरपुङ्गवः ||५||',
    hindi: 'और धृष्टकेतु तथा चेकितान और बलवान काशिराज, पुरुजित, कुन्तिभोज और मनुष्यों में श्रेष्ठ शैब्य हैं ||५||',
    english: 'There are also great heroic, powerful fighters like Dhrishtaketu, Cekitana, Kasiraja, Purujit, Kuntibhoja and Saibya. ||5||',
    meaning: 'The list continues, each name adding to Duryodhana\'s internal narrative of being surrounded by formidable foes. His focus remains external, on the perceived threats rather than his own army\'s strength.'
  },
  {
    num: 6,
    sanskrit: 'युधामन्युश्च विक्रान्त उत्तमौजाश्च वीर्यवान् |\nसौभद्रो द्रौपदेयाश्च सर्व एव महारथाः ||६||',
    hindi: 'पराक्रमी युधामन्यु तथा बलवान उत्तमौजा, सुभद्रापुत्र अभिमन्यु एवं द्रौपदी के पाँचों पुत्र; ये सभी महारथी हैं ||६||',
    english: 'There are the mighty Yudhamanyu, the very powerful Uttamauja, the son of Subhadra and the sons of Draupadi. All these warriors are great chariot fighters. ||6||',
    meaning: 'By acknowledging even the younger generation of warriors as "great chariot fighters," Duryodhana betrays his deep-seated fear. He sees threats everywhere, magnifying the strength of his opponents in his own mind.'
  },
  {
    num: 7,
    sanskrit: 'अस्माकं तु विशिष्टा ये तान्निबोध द्विजोत्तम |\nनायका मम सैन्यस्य संज्ञार्थं तान्ब्रवीमि ते ||७||',
    hindi: 'हे ब्राह्मणश्रेष्ठ! अपने पक्ष में भी जो प्रधान हैं, उनको आप समझ लीजिए। आपकी जानकारी के लिए मेरी सेना के जो-जो सेनापति हैं, उनको बतलाता हूँ ||७||',
    english: 'But for your information, O best of the brahmanas, let me tell you about the captains who are especially qualified to lead my military force. ||7||',
    meaning: 'After dwelling on his enemies, Duryodhana finally turns to his own side. His tone is almost boastful, an overcompensation for the insecurity he just displayed. He feels the need to prove his army\'s strength, both to Drona and to himself.'
  },
  {
    num: 8,
    sanskrit: 'भवान्भीष्मश्च कर्णश्च कृपश्च समितिञ्जयः |\nअश्वत्थामा विकर्णश्च सौमदत्तिस्तथैव च ||८||',
    hindi: 'आप-द्रोणाचार्य और पितामह भीष्म तथा कर्ण और संग्रामविजयी कृपाचार्य तथा वैसे ही अश्वत्थामा, विकर्ण और सोमदत्त का पुत्र भूरिश्रवा ||८||',
    english: 'There are personalities like you, Bhishma, Karna, Kripa, Asvatthama, Vikarna and the son of Somadatta called Bhurisrava. ||8||',
    meaning: 'He lists his own powerful warriors, including the very pillars of the Kuru dynasty. Yet, the fact that he needs to state this obvious fact reveals his need for reassurance.'
  },
  {
    num: 9,
    sanskrit: 'अन्ये च बहवः शूरा मदर्थे त्यक्तजीविताः |\nनानाशस्त्रप्रहरणाः सर्वे युद्धविशारदाः ||९||',
    hindi: 'और भी मेरे लिए जीवन की आशा त्याग देनेवाले बहुत-से शूरवीर अनेक प्रकार के शस्त्रास्त्रों से सुसज्जित और सब-के-सब युद्ध में चतुर हैं ||९||',
    english: 'There are many other heroes who are prepared to lay down their lives for my sake. All of them are well equipped with different kinds of weapons, and all are experienced in military science. ||9||',
    meaning: 'Duryodhana claims these heroes are ready to die "for my sake," highlighting his ego. He sees their sacrifice as a service to him personally, not to a greater cause or dharma.'
  },
  {
    num: 10,
    sanskrit: 'अपर्याप्तं तदस्माकं बलं भीष्माभिरक्षितम् |\nपर्याप्तं त्विदमेतेषां बलं भीमाभिरक्षितम् ||१०||',
    hindi: 'भीष्म पितामह द्वारा रक्षित हमारी वह सेना सब प्रकार से अजेय है और भीम द्वारा रक्षित इन लोगों की यह सेना जीतने में सुगम है ||१०||',
    english: 'Our strength is immeasurable, and we are perfectly protected by Grandfather Bhishma, whereas the strength of the Pandavas, carefully protected by Bhima, is limited. ||10||',
    meaning: 'A moment of deep psychological insight. Despite having a larger army led by the invincible Bhishma, Duryodhana feels their strength is "immeasurable" or insufficient. He feels the Pandavas\' smaller army, protected by the focused Bhima, is "sufficient." This reveals that true strength comes from conviction and righteousness, not just numbers.'
  },
  {
    num: 11,
    sanskrit: 'अयनेषु च सर्वेषु यथाभागमवस्थिताः |\nभीष्ममेवाभिरक्षन्तु भवन्तः सर्व एव हि ||११||',
    hindi: 'इसलिए सब मोर्चों पर अपनी-अपनी जगह स्थित रहते हुए आप लोग सभी निःसंदेह भीष्म पितामह की ही सब ओर से रक्षा करें ||११||',
    english: 'All of you must now give full support to Grandfather Bhishma, as you stand at your respective strategic points of entrance into the phalanx of the army. ||11||',
    meaning: 'His insecurity leads him to an odd command: he tells his entire army to protect their most powerful, invincible warrior. This tactical absurdity shows that his real goal is to ensure Bhishma is surrounded and committed, preventing any potential wavering of loyalty.'
  },
  {
    num: 12,
    sanskrit: 'तस्य सञ्जनयन्हर्षं कुरुवृद्धः पितामहः |\nसिंहनादं विनद्योच्चैः शङ्खं दध्मौ प्रतापवान् ||१२||',
    hindi: 'कौरवों में वृद्ध बड़े प्रतापी पितामह भीष्म ने उस दुर्योधन के हृदय में हर्ष उत्पन्न करते हुए उच्च स्वर से सिंह की दहाड़ के समान गरजकर शंख बजाया ||१२||',
    english: 'Then Bhishma, the great valiant grandsire of the Kuru dynasty, blew his conchshell very loudly, making a sound like the roar of a lion, giving Duryodhana joy. ||12||',
    meaning: 'Bhishma, understanding his grandson\'s anxiety, blows his conch to reassure him. It is an act of a grandfather trying to bolster a nervous youth, an attempt to signal that everything is under control.'
  },
  {
    num: 13,
    sanskrit: 'ततः शङ्खाश्च भेर्यश्च पणवानकगोमुखाः |\nसहसैवाभ्यहन्यन्त स शब्दस्तुमुलोऽभवत् ||१३||',
    hindi: 'तत्पश्चात् शंख और नगाड़े तथा ढोल, मृदंग और नरसिंघे आदि बाजे एक साथ ही बज उठे। उनका वह शब्द बड़ा भयंकर हुआ ||१३||',
    english: 'After that, the conchshells, drums, bugles, trumpets and horns were all suddenly sounded, and the combined sound was tumultuous. ||13||',
    meaning: 'The Kaurava side erupts in a cacophony of sound. This is a planned, orchestrated display of power, meant to intimidate. It is loud and impressive, but lacks the divine resonance of what is to come.'
  },
  {
    num: 14,
    sanskrit: 'ततः श्वेतैर्हयैर्युक्ते महति स्यन्दने स्थितौ |\nमाधवः पाण्डवश्चैव दिव्यौ शङ्खौ प्रदध्मतुः ||१४||',
    hindi: 'इसके अनन्तर सफेद घोड़ों से युक्त उत्तम रथ में बैठे हुए श्रीकृष्ण महाराज और अर्जुन ने भी अलौकिक शंख बजाए ||१४||',
    english: 'On the other side, both Lord Krishna and Arjuna, stationed on a great chariot drawn by white horses, sounded their transcendental conchshells. ||14||',
    meaning: 'The focus shifts to the other side. The description is immediately different: their chariot is "great," their horses "white" (a symbol of purity), and their conches "divine." This contrast signifies that the Pandavas\' power is not merely material but is aligned with a higher, spiritual force.'
  },
  {
    num: 15,
    sanskrit: 'पाञ्चजन्यं हृषीकेशो देवदत्तं धनञ्जयः |\nपौण्ड्रं दध्मौ महाशङ्खं भीमकर्मा वृकोदरः ||१५||',
    hindi: 'श्रीकृष्ण महाराज ने पाञ्चजन्य नामक, अर्जुन ने देवदत्त नामक और भयानक कर्मवाले भीमसेन ने पौण्ड्र नामक महाशंख बजाया ||१५||',
    english: 'Lord Krishna blew His conchshell, called Pancajanya; Arjuna blew his, the Devadatta; and Bhima, the voracious eater and performer of herculean tasks, blew his terrific conchshell, called Paundra. ||15||',
    meaning: 'Each divine conch has a name and a purpose. Krishna\'s "Pancajanya" can control the five senses. Arjuna\'s "Devadatta" (God-given) represents divine grace. Bhima\'s "Paundra" reflects his immense power. Their sounds are not just noise; they are declarations of divine authority.'
  },
  {
    num: 16,
    sanskrit: 'अनन्तविजयं राजा कुन्तीपुत्रो युधिष्ठिरः |\nनकुलः सहदेवश्च सुघोषमणिपुष्पकौ ||१६||',
    hindi: 'कुन्तीपुत्र राजा युधिष्ठिर ने अनन्तविजय नामक और नकुल तथा सहदेव ने सुघोष और मणिपुष्पक नामक शंख बजाए ||१६||',
    english: 'King Yudhishthira, the son of Kunti, blew his conchshell, the Anantavijaya, and Nakula and Sahadeva blew the Sughosha and Manipushpaka. ||16||',
    meaning: 'Yudhishthira\'s conch, "Anantavijaya" (Endless Victory), symbolizes the ultimate triumph of dharma. The sounds of the Pandava conches represent the harmony and righteousness of their cause.'
  },
  {
    num: 17,
    sanskrit: 'काश्यश्च परमेष्वासः शिखण्डी च महारथः |\nधृष्टद्युम्नो विराटश्च सात्यकिश्चापराजितः ||१७||',
    hindi: 'श्रेष्ठ धनुषवाले काशिराज और महारथी शिखण्डी एवं धृष्टद्युम्न तथा राजा विराट और अजेय सात्यकि ||१७||',
    english: 'That great archer the King of Kasi, the great fighter Sikhandi, Dhrishtadyumna, Virata, the unconquerable Satyaki, ||17||',
    meaning: 'The allies of the Pandavas join in, each a formidable warrior in their own right, underscoring the strength and righteousness of their coalition.'
  },
  {
    num: 18,
    sanskrit: 'द्रुपदो द्रौपदेयाश्च सर्वशः पृथिवीपते |\nसौभद्रश्च महाबाहुः शङ्खान्दध्मुः पृथक्पृथक् ||१८||',
    hindi: 'हे राजन्! राजा द्रुपद एवं द्रौपदी के पाँचों पुत्र और बड़ी भुजावाले सुभद्रापुत्र अभिमन्यु-इन सभी ने सब ओर से अलग-अलग शंख बजाए ||१८||',
    english: 'Drupada, the sons of Draupadi, and the others, O King, such as the mighty-armed son of Subhadra, all blew their respective conchshells. ||18||',
    meaning: 'The sound is unified and harmonious. Unlike the chaotic noise of the Kauravas, the Pandavas\' response is a symphony of conviction, each warrior adding their voice to the collective call of dharma.'
  },
  {
    num: 19,
    sanskrit: 'स घोषो धार्तराष्ट्राणां हृदयानि व्यदारयत् |\nनभश्च पृथिवीं चैव तुमुलो व्यनुनादयन् ||१९||',
    hindi: 'और उस भयानक शब्द ने आकाश और पृथ्वी को भी गुंजाते हुए धृतराष्ट्र के-अर्थात् आपके पक्षवालों के हृदय विदीर्ण कर दिए ||१९||',
    english: 'The blowing of these different conchshells became uproarious. Vibrating both in the sky and on the earth, it shattered the hearts of the sons of Dhritarashtra. ||19||',
    meaning: 'The sound of dharma is terrifying to those who are adharmic. The Pandavas\' conches don\'t just create noise; they resonate with cosmic truth, and this resonance "shatters the hearts" of the Kauravas, whose cause is built on a foundation of lies and greed.'
  },
  {
    num: 20,
    sanskrit: 'अथ व्यवस्थितान्दृष्ट्वा धार्तराष्ट्रान्कपिध्वजः |\nप्रवृत्ते शस्त्रसम्पाते धनुरुद्यम्य पाण्डवः |\nहृषीकेशं तदा वाक्यमिदमाह महीपते ||२०||',
    hindi: 'हे राजन्! इसके बाद कपिध्वज अर्जुन ने मोर्चा बाँधकर डटे हुए धृतराष्ट्र-सम्बन्धियों को देखकर, उस शस्त्र-संचालन की तैयारी के समय धनुष उठाकर हृषीकेश श्रीकृष्ण महाराज से यह वचन कहा ||२०||',
    english: 'At that time Arjuna, the son of Pandu, seated in the chariot bearing the flag marked with Hanuman, took up his bow and prepared to shoot his arrows. O King, after looking at the sons of Dhritarashtra drawn in military array, Arjuna then spoke to Lord Krishna these words. ||20||',
    meaning: 'The battle is about to begin. Arjuna, the great hero, is ready. His flag bears the image of Hanuman, symbolizing selfless service and devotion. He is poised for action, but first, he has a request for his divine charioteer.'
  },
  {
    num: 21,
    sanskrit: 'अर्जुन उवाच |\nसेनयोरुभयोर्मध्ये रथं स्थापय मेऽच्युत |\nयावदेतान्निरीक्षेऽहं योद्धुकामानवस्थितान् ||२१||\nकैर्मया सह योद्धव्यमस्मिन् रणसमुद्यमे ||२२||',
    hindi: 'अर्जुन बोले- हे अच्युत! मेरे रथ को दोनों सेनाओं के बीच में खड़ा कीजिए, जब तक कि मैं इन युद्ध क्षेत्र में डटे हुए युद्ध के अभिलाषी इन विपक्षी योद्धाओं को भली प्रकार देख लूँ कि इस युद्ध रूप व्यापार में मुझे किन-किन के साथ युद्ध करना योग्य है ||२१-२२||',
    english: 'Arjuna said: O infallible one, please draw my chariot between the two armies so that I may see those present here, who desire to fight, and with whom I must contend in this great trial of arms. ||21-22||',
    meaning: 'This is the pivotal moment. Arjuna, still confident, wants to get a clear look at his enemy. He wants to see who he is about to fight. This desire to "see" is what triggers his crisis. He asks the "infallible one" (Krishna) to take him to a place of neutrality, between the two opposing sides.'
  },
  {
    num: 23,
    sanskrit: 'योत्स्यमानानवेक्षेऽहं य एतेऽत्र समागताः |\nधार्तराष्ट्रस्य दुर्बुद्धेर्युद्धे प्रियचिकीर्षवः ||२३||',
    hindi: 'जो लोग इस सेना में आए हैं, उन युद्ध करनेवालों को मैं देखूँगा, जो-जो कि इस युद्ध में दुर्बुद्धि दुर्योधन का प्रिय करने की इच्छा से यहाँ आए हैं ||२३||',
    english: 'Let me see those who have come here to fight, wishing to please the evil-minded son of Dhritarashtra. ||23||',
    meaning: 'Arjuna still frames the conflict in terms of good vs. evil. He sees the opposing army as supporters of the "evil-minded" Duryodhana. His perspective is still black and white, but this is about to change dramatically.'
  },
  {
    num: 24,
    sanskrit: 'सञ्जय उवाच |\nएवमुक्तो हृषीकेशो गुडाकेशेन भारत |\nसेनयोरुभयोर्मध्ये स्थापयित्वा रथोत्तमम् ||२४||',
    hindi: 'संजय बोले- हे धृतराष्ट्र! अर्जुन द्वारा इस प्रकार कहे हुए महाराज श्रीकृष्णचन्द्र ने दोनों सेनाओं के बीच में भीष्म और द्रोणाचार्य के सामने तथा सम्पूर्ण राजाओं के सामने उत्तम रथ को खड़ा कर दिया ||२४||',
    english: 'Sanjaya said: O descendant of Bharata, having been thus addressed by Arjuna, Lord Krishna drew up the fine chariot in the midst of the armies of both parties. ||24||',
    meaning: 'Krishna, the master of the senses (Hrishikesha), obliges the request of Arjuna, the conqueror of sleep (Gudakesha). The divine charioteer, knowing exactly what will happen, facilitates the moment of crisis.'
  },
  {
    num: 25,
    sanskrit: 'भीष्मद्रोणप्रमुखतः सर्वेषां च महीक्षिताम् |\nउवाच पार्थ पश्यैतान्समवेतान्कुरूनिति ||२५||',
    hindi: 'और अर्जुन से कहा कि हे पार्थ! युद्ध के लिए जुटे हुए इन कौरवों को देख ||२५||',
    english: 'In the presence of Bhishma, Drona and all the other chieftains of the world, the Lord said, Just behold, Partha, all the Kurus assembled here. ||25||',
    meaning: 'Krishna strategically places the chariot directly in front of Bhishma and Drona—the two figures who represent family, tradition, and respect for Arjuna. He doesn\'t say "Behold your enemies." He says, "Behold the Kurus," reminding Arjuna that these are not faceless foes; they are his family.'
  },
  {
    num: 26,
    sanskrit: 'तत्रापश्यत्स्थितान्पार्थः पितॄनथ पितामहान् |\nआचार्यान्मातुलान्भ्रातॄन्पुत्रान्पौत्रान्सखींस्तथा |\nश्वशुरान्सुहृदश्चैव सेनयोरुभयोरपि ||२६||',
    hindi: 'इसके बाद पृथापुत्र अर्जुन ने उन दोनों ही सेनाओं में स्थित ताऊ-चाचों को, दादों-परदादों को, गुरुओं को, मामाओं को, भाइयों को, पुत्रों को, पौत्रों को तथा मित्रों को, ससुरों को और सुहृदों को भी देखा ||२६||',
    english: 'There Arjuna could see, within the midst of the armies of both parties, his fathers, grandfathers, teachers, maternal uncles, brothers, sons, grandsons, friends, and also his fathers-in-law and well-wishers. ||26||',
    meaning: 'The moment of realization hits. Arjuna no longer sees an army of enemies; he sees a web of relationships. He sees grandfathers, teachers, uncles, brothers, sons. The abstract concept of "war" becomes a devastatingly personal reality.'
  },
  {
    num: 27,
    sanskrit: 'तान्समीक्ष्य स कौन्तेयः सर्वान्बन्धूनवस्थितान् |\nकृपया परयाविष्टो विषीदन्निदमब्रवीत् ||२७||',
    hindi: 'उन उपस्थित सम्पूर्ण बन्धुओं को देखकर वे कुन्तीपुत्र अर्जुन अत्यन्त करुणा से युक्त होकर शोक करते हुए यह वचन बोले ||२७||',
    english: 'When the son of Kunti, Arjuna, saw all these different grades of friends and relatives, he became overwhelmed with compassion and spoke thus. ||27||',
    meaning: 'His warrior spirit dissolves, replaced by overwhelming compassion and grief. This is not cowardice; it is the response of a sensitive heart faced with an impossible dilemma. His sorrow (vishada) becomes a form of yoga—a state through which spiritual connection can be forged.'
  },
  {
    num: 28,
    sanskrit: 'अर्जुन उवाच |\nदृष्ट्वेमं स्वजनं कृष्ण युयुत्सुं समुपस्थितम् |\nसीदन्ति मम गात्राणि मुखं च परिशुष्यति ||२८||',
    hindi: 'अर्जुन बोले- हे कृष्ण! युद्ध क्षेत्र में डटे हुए युद्ध के अभिलाषी इस स्वजन-समुदाय को देखकर मेरे अंग शिथिल हुए जा रहे हैं और मुख सूखा जा रहा है ||२८||',
    english: 'Arjuna said: My dear Krishna, seeing my friends and relatives present before me in such a fighting spirit, I feel the limbs of my body quivering and my mouth drying up. ||28||',
    meaning: 'Arjuna\'s mental anguish manifests physically. His body begins to shut down. This psychosomatic response shows the depth of his internal conflict. He is experiencing a profound identity crisis.'
  },
  {
    num: 29,
    sanskrit: 'वेपथुश्च शरीरे मे रोमहर्षश्च जायते |\nगाण्डीवं स्रंसते हस्तात्त्वक्चैव परिदह्यते ||२९||',
    hindi: 'तथा मेरे शरीर में कम्प एवं रोमांच हो रहा है, हाथ से गाण्डीव धनुष गिर रहा है और त्वचा भी बहुत जल रही है ||२९||',
    english: 'My whole body is trembling, my hair is standing on end, my bow Gandiva is slipping from my hand, and my skin is burning. ||29||',
    meaning: 'The symptoms worsen. His legendary bow, Gandiva, an extension of his warrior identity, literally slips from his grasp. He is losing his grip not just on his weapon, but on his sense of self and purpose (dharma).'
  },
  {
    num: 30,
    sanskrit: 'न च शक्नोम्यवस्थातुं भ्रमतीव च मे मनः |\nनिमित्तानि च पश्यामि विपरीतानि केशव ||३०||',
    hindi: 'हे केशव! मैं खड़ा रहने को भी समर्थ नहीं हूँ और मेरा मन भ्रमित-सा हो रहा है तथा मैं लक्षणों को भी विपरीत ही देख रहा हूँ ||३०||',
    english: 'I am now unable to stand here any longer. I am forgetting myself, and my mind is reeling. I see only causes of misfortune, O Krishna, killer of the Kesi demon. ||30||',
    meaning: 'His mind is "reeling." He can no longer stand, physically or mentally. He sees only bad omens, a projection of his own inner turmoil onto the external world. His world is collapsing.'
  },
  {
    num: 31,
    sanskrit: 'न च श्रेयोऽनुपश्यामि हत्वा स्वजनमाहवे |\nन काङ्क्षे विजयं कृष्ण न च राज्यं सुखानि च ||३१||',
    hindi: 'तथा युद्ध में अपने ही स्वजन-समुदाय को मारकर कल्याण भी नहीं देखता। हे कृष्ण! मैं न तो विजय चाहता हूँ और न राज्य तथा सुखों को ही ||३१||',
    english: 'I do not see how any good can come from killing my own kinsmen in this battle, nor can I, my dear Krishna, desire any subsequent victory, kingdom, or happiness. ||31||',
    meaning: 'Arjuna begins to rationalize his emotional state with logical arguments. He questions the very purpose of the war. What good can come from this? Victory, kingdom, happiness—all seem meaningless when the cost is the lives of his loved ones.'
  },
  {
    num: 32,
    sanskrit: 'किं नो राज्येन गोविन्द किं भोगैर्जीवितेन वा |\nयेषामर्थे काङ्क्षितं नो राज्यं भोगाः सुखानि च ||३२||',
    hindi: 'हे गोविन्द! हमें ऐसे राज्य से क्या प्रयोजन है अथवा ऐसे भोगों से और जीवन से भी क्या लाभ है? क्योंकि जिनके लिए हमें राज्य, भोग और सुखादि अभीष्ट हैं ||३२||',
    english: 'O Govinda, of what avail to us are a kingdom, happiness or even life itself when all those for whom we may desire them are now arrayed on this battlefield? ||32||',
    meaning: 'He voices a profound existential question. We strive for success and happiness to share them with others. If those very people are the ones we must destroy to achieve it, the achievement itself becomes hollow and pointless.'
  },
  {
    num: 33,
    sanskrit: 'त इमेऽवस्थिता युद्धे प्राणांस्त्यक्त्वा धनानि च |\nआचार्याः पितरः पुत्रास्तथैव च पितामहाः ||३३||',
    hindi: 'वे ही ये आचार्य, ताऊ-चाचे, लड़के और उसी प्रकार दादे, मामे, ससुर, पौत्र, साले तथा और भी सम्बन्धी लोग धन और जीवन की आशा को त्यागकर युद्ध में खड़े हैं ||३३||',
    english: 'O Madhusudana, when teachers, fathers, sons, grandfathers, maternal uncles, fathers-in-law, grandsons, brothers-in-law and other relatives are ready to give up their lives and properties and are standing before me, ||33||',
    meaning: 'He repeats the list of relatives, the names now burning in his mind. He acknowledges that they too are ready to sacrifice everything, which only deepens his sense of tragic futility.'
  },
  {
    num: 34,
    sanskrit: 'मातुलाः श्वशुराः पौत्राः श्यालाः सम्बन्धिनस्तथा |\nएतान्न हन्तुमिच्छामि घ्नतोऽपि मधुसूदन ||३४||',
    hindi: 'हे मधुसूदन! मुझे मारने पर भी अथवा तीनों लोकों के राज्य के लिए भी मैं इन सबको मारना नहीं चाहता, फिर पृथ्वी के लिए तो कहना ही क्या है? ||३४||',
    english: 'why should I wish to kill them, even though they might otherwise kill me? O maintainer of all living entities, I am not prepared to fight with them even in exchange for the three worlds, let alone this earth. What pleasure will we derive from killing the sons of Dhritarashtra? ||34||',
    meaning: 'Arjuna\'s compassion reaches its peak. He declares he would rather be killed himself than harm his relatives, even for the sovereignty of the three worlds. The material prize of a kingdom seems insignificant compared to the spiritual crime of killing family.'
  },
  {
    num: 35,
    sanskrit: 'अपि त्रैलोक्यराज्यस्य हेतोः किं नु महीकृते |\nनिहत्य धार्तराष्ट्रान्नः का प्रीतिः स्याज्जनार्दन ||३५||',
    hindi: 'हे जनार्दन! धृतराष्ट्र के पुत्रों को मारकर हमें क्या प्रसन्नता होगी? ||३५||',
    english: 'Sin will overcome us if we slay such aggressors. Therefore it is not proper for us to kill the sons of Dhritarashtra and our friends. What should we gain, O Krishna, husband of the goddess of fortune, and how could we be happy by killing our own kinsmen? ||35||',
    meaning: 'He shifts his argument from personal grief to the concept of sin (paap). He reasons that killing his kinsmen, even if they are aggressors, will bring nothing but negative karmic consequences. There can be no real "pleasure" or "preeti" from such an act.'
  },
  {
    num: 36,
    sanskrit: 'पापमेवाश्रयेदस्मान्हत्वैतानाततायिनः |\nतस्मान्नार्हा वयं हन्तुं धार्तराष्ट्रान्स्वबान्धवान् |\nस्वजनं हि कथं हत्वा सुखिनः स्याम माधव ||३६||',
    hindi: 'इन आततायियों को मारकर तो हमें पाप ही लगेगा। अतएव हे माधव! अपने ही बान्धव धृतराष्ट्र के पुत्रों को मारने के लिए हम योग्य नहीं हैं क्योंकि अपने ही कुटुम्ब को मारकर हम कैसे सुखी होंगे? ||३६||',
    english: 'O Janardana, although these men, their hearts overtaken by greed, see no fault in killing one’s family or quarreling with friends, ||36||',
    meaning: 'He concludes that they are not "worthy" or justified in killing their own relatives. The central question returns: "How can we be happy by killing our own people?" It is a cry for a path that does not lead to sorrow.'
  },
  {
    num: 37,
    sanskrit: 'यद्यप्येते न पश्यन्ति लोभोपहतचेतसः |\nकुलक्षयकृतं दोषं मित्रद्रोहे च पातकम् ||३७||',
    hindi: 'यद्यपि लोभ से भ्रष्टचित्त हुए ये लोग कुल के नाश से उत्पन्न होनेवाले दोष को और मित्रों से विरोध करने में पाप को नहीं देखते ||३७||',
    english: 'why should we, who can see the crime in destroying a family, engage in these acts of sin? ||37||',
    meaning: 'Arjuna makes a crucial distinction. He argues that even if his opponents are blinded by greed and cannot see the fault in their actions, he and the Pandavas *can* see it. This implies a higher moral responsibility. Knowing something is wrong and doing it anyway is a greater sin.'
  },
  {
    num: 38,
    sanskrit: 'कथं न ज्ञेयमस्माभिः पापादस्मान्निवर्तितुम् |\nकुलक्षयकृतं दोषं प्रपश्यद्भिर्जनार्दन ||३८||',
    hindi: 'तो भी हे जनार्दन! कुल के नाश से उत्पन्न होनेवाले दोष को जाननेवाले हम लोगों को इस पाप से हटने के लिए क्यों नहीं विचार करना चाहिए? ||३८||',
    english: 'With the destruction of dynasty, the eternal family tradition is vanquished, and thus the rest of the family becomes involved in irreligion. ||38||',
    meaning: 'He poses a rhetorical question to Krishna: "Since we can foresee the disastrous consequences, shouldn\'t we be the ones to turn away from this sinful act?" He is appealing to reason and foresight as a basis for inaction.'
  },
  {
    num: 39,
    sanskrit: 'कुलक्षये प्रणश्यन्ति कुलधर्माः सनातनाः |\nधर्मे नष्टे कुलं कृत्स्नमधर्मोऽभिभवत्युत ||३९||',
    hindi: 'कुल के नाश से सनातन कुल-धर्म नष्ट हो जाते हैं, धर्म के नाश हो जाने पर सम्पूर्ण कुल में पाप भी बहुत फैल जाता है ||३९||',
    english: 'When irreligion is prominent in the family, O Krishna, the women of the family become polluted, and from the degradation of womanhood, O descendant of Vrishni, comes unwanted progeny. ||39||',
    meaning: 'Arjuna now outlines the societal collapse he foresees. The destruction of the family (kula) leads to the destruction of tradition and righteousness (dharma). When dharma is lost, adharma (unrighteousness) prevails, poisoning the entire lineage.'
  },
  {
    num: 40,
    sanskrit: 'अधर्माभिभवात्कृष्ण प्रदुष्यन्ति कुलस्त्रियः |\nस्त्रीषु दुष्टासु वार्ष्णेय जायते वर्णसङ्करः ||४०||',
    hindi: 'हे कृष्ण! पाप के अधिक बढ़ जाने से कुल की स्त्रियाँ अत्यन्त दूषित हो जाती हैं और हे वार्ष्णेय! स्त्रियों के दूषित हो जाने पर वर्णसंकर उत्पन्न होता है ||४०||',
    english: 'An increase of unwanted population certainly causes hellish life both for the family and for those who destroy the family tradition. The ancestors of such corrupt families fall down, because the performances for offering them food and water are entirely stopped. ||40||',
    meaning: 'He argues that societal decay leads to the corruption of family purity. This results in "varna-sankara," the confusion of social order, which he believes will destabilize society for generations.'
  },
  {
    num: 41,
    sanskrit: 'सङ्करो नरकायैव कुलघ्नानां कुलस्य च |\nपतन्ति पितरो ह्येषां लुप्तपिण्डोदकक्रियाः ||४१||',
    hindi: 'वर्णसंकर कुलघातियों को और कुल को नरक में ले जाने के लिए ही होता है। लुप्त हुई पिण्ड और जल की क्रियावाले अर्थात् श्राद्ध और तर्पण से वंचित इनके पितर लोग भी अधोगति को प्राप्त होते हैं ||४१||',
    english: 'By the evil deeds of those who destroy the family tradition and thus give rise to unwanted children, all kinds of community projects and family welfare activities are devastated. ||41||',
    meaning: 'This social chaos, he reasons, leads to hell not only for the perpetrators but for the entire family line. Even the ancestors suffer, as the sacred rites offering them peace (pinda) will cease.'
  },
  {
    num: 42,
    sanskrit: 'दोषैरेतैः कुलघ्नानां वर्णसङ्करकारकैः |\nउत्साद्यन्ते जातिधर्माः कुलधर्माश्च शाश्वताः ||४२||',
    hindi: 'इन वर्णसंकरकारक दोषों से कुलघातियों के सनातन कुल-धर्म और जाति-धर्म नष्ट हो जाते हैं ||४२||',
    english: 'O Krishna, maintainer of the people, I have heard by disciplic succession that those who destroy family traditions dwell always in hell. ||42||',
    meaning: 'Arjuna summarizes his point: the actions of those who destroy a family lead to the collapse of eternal traditions, both of the family and the community.'
  },
  {
    num: 43,
    sanskrit: 'उत्सन्नकुलधर्माणां मनुष्याणां जनार्दन |\nनरकेऽनियतं वासो भवतीत्यनुशुश्रुम ||४३||',
    hindi: 'हे जनार्दन! जिनका कुल-धर्म नष्ट हो गया है, ऐसे मनुष्यों का अनिश्चितकाल तक नरक में वास होता है, ऐसा हम सुनते आए हैं ||४३||',
    english: 'Alas, how strange it is that we are preparing to commit greatly sinful acts. Driven by the desire to enjoy royal happiness, we are intent on killing our own kinsmen. ||43||',
    meaning: 'He concludes his argument by stating what he has "heard from tradition" (anushushruma): those who destroy their family dharma are condemned to hell. He is relying on established religious belief to justify his refusal to fight.'
  },
  {
    num: 44,
    sanskrit: 'अहो बत महत्पापं कर्तुं व्यवसिता वयम् |\nयद्राज्यसुखलोभेन हन्तुं स्वजनमुद्यताः ||४४||',
    hindi: 'हा! शोक! हम लोग बुद्धिमान होकर भी महान पाप करने को तैयार हो गए हैं, जो राज्य और सुख के लोभ से स्वजनों को मारने के लिए उद्यत हैं ||४४||',
    english: 'Better for me if the sons of Dhritarashtra, weapons in hand, were to kill me unarmed and unresisting on the battlefield. ||44||',
    meaning: 'A moment of self-recrimination. "Alas," he says, "what a great sin we were about to commit." He attributes the motive to greed for the kingdom, turning his criticism inward. He sees his previous readiness to fight as a moral failing.'
  },
  {
    num: 45,
    sanskrit: 'यदि मामप्रतीकारमशस्त्रं शस्त्रपाणयः |\nधार्तराष्ट्रा रणे हन्युस्तन्मे क्षेमतरं भवेत् ||४५||',
    hindi: 'यदि मुझ शस्त्ररहित एवं सामना न करनेवाले को शस्त्र हाथ में लिए हुए धृतराष्ट्र के पुत्र रण में मार डालें तो वह मारना भी मेरे लिए अधिक कल्याणकारक होगा ||४५||',
    english: 'Sanjaya said: Arjuna, having thus spoken on the battlefield, cast aside his bow and arrows and sat down on the chariot, his mind overwhelmed with grief. ||45||',
    meaning: 'In complete surrender to his grief, Arjuna declares it would be better for him to be killed, unarmed and unresisting, than to participate in this slaughter. This is the lowest point of his despair, a total renunciation of his dharma as a warrior.'
  },
  {
    num: 46,
    sanskrit: 'सञ्जय उवाच |\nएवमुक्त्वार्जुनः सङ्ख्ये रथोपस्थ उपाविशत् |\nविसृज्य सशरं चापं शोकसंविग्नमानसः ||४६||',
    hindi: 'संजय बोले- रणभूमि में शोक से उद्विग्न मनवाले अर्जुन इस प्रकार कहकर, बाणसहित धनुष को त्यागकर रथ के पिछले भाग में बैठ गए ||४६||',
    english: 'Sanjaya said: Arjuna, having thus spoken on the battlefield, cast aside his bow and arrows and sat down on the chariot, his mind overwhelmed with grief. ||46||',
    meaning: 'The chapter concludes with this powerful image of defeat. Arjuna, the mighty warrior, casts aside his bow and sinks into his chariot, completely overcome by sorrow. He is broken, empty, and ready to receive the divine wisdom of the Gita.'
  },
  {
    num: 47,
    sanskrit: 'ॐ तत्सदिति श्रीमद्भगवद्गीतासूपनिषत्सु\nब्रह्मविद्यायां योगशास्त्रे श्रीकृष्णार्जुनसंवादे\nअर्जुनविषादयोगो नाम प्रथमोऽध्यायः ॥१॥',
    hindi: 'ॐ तत्सदिति श्रीमद्भगवद्गीतासूपनिषत्सु ब्रह्मविद्यायां योगशास्त्रे श्रीकृष्णार्जुनसंवादे अर्जुनविषादयोगो नाम प्रथमोऽध्यायः ॥१॥',
    english: 'Thus ends the first chapter of the Srimad Bhagavad Gita, from the Upanishads of the Brahmavidya, the scripture of yoga, the dialogue between Sri Krishna and Arjuna, entitled "The Yoga of Arjuna\'s Dejection".',
    meaning: 'This concluding verse, known as the colophon, frames the chapter not as a story of despair, but as a form of "yoga"—a path to union with the divine. Arjuna\'s crisis is the necessary first step on his spiritual journey.'
  },
];


const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Adhyay1 = () => {
  const { currentUser } = useAuth(); // Get the logged-in user from context
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Fetch bookmarks from Firestore when user logs in ---
  useEffect(() => {
    // Only fetch if a user is logged in
    if (currentUser) {
      const fetchBookmarks = async () => {
        setIsLoading(true);
        const docRef = doc(db, 'userBookmarks', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Get bookmarks for chapter 1, default to empty array if field doesn't exist
          setBookmarks(docSnap.data().chapter1 || []);
        } else {
          // No previous bookmarks for this user
          setBookmarks([]);
        }
        setIsLoading(false);
      };
      fetchBookmarks();
    } else {
      // If no user is logged in, clear bookmarks and stop loading
      setBookmarks([]);
      setIsLoading(false);
    }
  }, [currentUser]);

  // --- Function to toggle a bookmark and save to Firestore ---
  const toggleBookmark = async (shlokaNum) => {
    if (!currentUser) {
      alert("Please log in to save your bookmarks.");
      return;
    }

    // Optimistically update the UI
    const newBookmarks = bookmarks.includes(shlokaNum)
      ? bookmarks.filter(num => num !== shlokaNum)
      : [...bookmarks, shlokaNum];
    setBookmarks(newBookmarks);

    // Save the updated array to Firestore
    try {
      const docRef = doc(db, 'userBookmarks', currentUser.uid);
      // Use { merge: true } to avoid overwriting bookmarks for other chapters
      await setDoc(docRef, { chapter1: newBookmarks }, { merge: true });
    } catch (error) {
      console.error("Error updating bookmarks:", error);
      // Optional: Revert UI change on error
    }
  };


  return (
    <div className="bg-gradient-to-br from-amber-50/30 via-[#F8F5F2] to-orange-50/20 text-slate-800 min-h-screen font-sans">
      {/* Page Header */}
      <motion.section
        className="relative py-20 sm:py-28 text-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* ... Header JSX is unchanged ... */}
         <div className="relative container mx-auto px-4">
          <motion.div 
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-200/50 text-amber-700 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <BookOpenIcon className="w-10 h-10" />
          </motion.div>
          <motion.p 
            className="text-amber-700 font-bold tracking-[0.2em] text-sm uppercase mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            अध्याय १
          </motion.p>
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 mt-4 mb-6 p-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            अर्जुनविषादयोगः
          </motion.h1>
          <motion.h2 
            className="text-2xl md:text-3xl font-serif text-slate-600 italic mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            The Yoga of Arjuna's Dejection
          </motion.h2>
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              to="/gita/chapters"
              className="group inline-flex items-center gap-3 text-amber-700 font-semibold hover:text-amber-900 transition-all duration-300 px-6 py-3 rounded-full border border-amber-200/50 hover:border-amber-300 hover:bg-amber-50/50 backdrop-blur-sm"
            >
              <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to All Chapters
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Shlokas List */}
      <section className="relative pb-20 sm:pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-10">
            {chapter1Shlokas.map((shloka, i) => (
              <motion.div
                key={shloka.num}
                className="group relative bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-500 hover:border-amber-200"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } },
                }}
                whileHover={{ y: -4 }}
              >
                <div className="relative p-8 md:p-10">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-xl font-bold text-amber-700 bg-gradient-to-r from-amber-100 to-amber-50 px-5 py-2 rounded-xl border border-amber-200/50 shadow-sm">
                      1.{shloka.num}
                    </span>
                    
                    <motion.button
                      onClick={() => toggleBookmark(shloka.num)}
                      className="p-3 rounded-full hover:bg-amber-100/50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={bookmarks.includes(shloka.num) ? 'Remove bookmark' : 'Add bookmark'}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      disabled={isLoading || !currentUser}
                    >
                      {bookmarks.includes(shloka.num) ? (
                        <BookmarkSolidIcon className="w-6 h-6 text-amber-500" />
                      ) : (
                        <BookmarkOutlineIcon className="w-6 h-6 text-slate-400 group-hover:text-amber-500 transition-colors" />
                      )}
                    </motion.button>
                  </div>

                  {/* ... Rest of the shloka card JSX is unchanged ... */}
                  <p className="text-2xl md:text-3xl font-serif text-slate-900 leading-loose text-center whitespace-pre-line relative z-10 tracking-wide mb-10">
                    {shloka.sanskrit}
                  </p>
                  <div className="space-y-8">
                    {/* What It Means Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full" />
                        <h3 className="font-bold text-slate-800 text-lg">What It Means</h3>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50/20 to-indigo-50/20 p-6 rounded-xl border border-slate-100">
                        <p className="text-slate-700 leading-relaxed text-lg font-medium italic">"{shloka.meaning}"</p>
                      </div>
                    </motion.div>
                    {/* Hindi Translation */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
                        <h3 className="font-bold text-slate-800 text-lg">हिन्दी अनुवाद</h3>
                      </div>
                      <div className="bg-gradient-to-r from-slate-50 to-amber-50/30 p-6 rounded-xl border border-slate-100">
                        <p className="text-slate-700 leading-relaxed text-lg font-medium">{shloka.hindi}</p>
                      </div>
                    </motion.div>
                    {/* English Translation */}
                     <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-6 bg-gradient-to-b from-sky-500 to-blue-500 rounded-full" />
                        <h3 className="font-bold text-slate-800 text-lg">English Translation</h3>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50/20 to-slate-50 p-6 rounded-xl border border-slate-100">
                        <p className="text-slate-700 leading-relaxed text-lg font-medium">{shloka.english}</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Adhyay1;
