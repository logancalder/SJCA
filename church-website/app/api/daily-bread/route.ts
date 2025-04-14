import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

// Bible book name translations
const bibleBookTranslations: Record<string, string> = {
  "Genesis": "創世記",
  "Exodus": "出埃及記",
  "Leviticus": "利未記",
  "Numbers": "民數記",
  "Deuteronomy": "申命記",
  "Joshua": "約書亞記",
  "Judges": "士師記",
  "Ruth": "路得記",
  "1 Samuel": "撒母耳記上",
  "2 Samuel": "撒母耳記下",
  "1 Kings": "列王紀上",
  "2 Kings": "列王紀下",
  "1 Chronicles": "歷代志上",
  "2 Chronicles": "歷代志下",
  "Ezra": "以斯拉記",
  "Nehemiah": "尼希米記",
  "Esther": "以斯帖記",
  "Job": "約伯記",
  "Psalms": "詩篇",
  "Proverbs": "箴言",
  "Ecclesiastes": "傳道書",
  "Song of Songs": "雅歌",
  "Isaiah": "以賽亞書",
  "Jeremiah": "耶利米書",
  "Lamentations": "耶利米哀歌",
  "Ezekiel": "以西結書",
  "Daniel": "但以理書",
  "Hosea": "何西阿書",
  "Joel": "約珥書",
  "Amos": "阿摩司書",
  "Obadiah": "俄巴底亞書",
  "Jonah": "約拿書",
  "Micah": "彌迦書",
  "Nahum": "那鴻書",
  "Habakkuk": "哈巴谷書",
  "Zephaniah": "西番雅書",
  "Haggai": "哈該書",
  "Zechariah": "撒迦利亞書",
  "Malachi": "瑪拉基書",
  "Matthew": "馬太福音",
  "Mark": "馬可福音",
  "Luke": "路加福音",
  "John": "約翰福音",
  "Acts": "使徒行傳",
  "Romans": "羅馬書",
  "1 Corinthians": "哥林多前書",
  "2 Corinthians": "哥林多後書",
  "Galatians": "加拉太書",
  "Ephesians": "以弗所書",
  "Philippians": "腓立比書",
  "Colossians": "歌羅西書",
  "1 Thessalonians": "帖撒羅尼迦前書",
  "2 Thessalonians": "帖撒羅尼迦後書",
  "1 Timothy": "提摩太前書",
  "2 Timothy": "提摩太後書",
  "Titus": "提多書",
  "Philemon": "腓利門書",
  "Hebrews": "希伯來書",
  "James": "雅各書",
  "1 Peter": "彼得前書",
  "2 Peter": "彼得後書",
  "1 John": "約翰一書",
  "2 John": "約翰二書",
  "3 John": "約翰三書",
  "Jude": "猶大書",
  "Revelation": "啟示錄"
}

// List of books with only one chapter
const singleChapterBooks = [
  "Obadiah",
  "Philemon",
  "2 John",
  "3 John",
  "Jude"
];

// Function to translate reference from English to Chinese
function translateReference(reference: string): string {
  // Extract book name and chapter/verse
  const match = reference.match(/^([\d\s]*[A-Za-z]+)\s+(.+)$/);
  if (!match) return reference;
  
  const bookName = match[1].trim();
  const chapterVerse = match[2];
  
  // Look up the Chinese translation
  const chineseBook = bibleBookTranslations[bookName] || bookName;
  
  return `${chineseBook} ${chapterVerse}`;
}

// Function to get Chinese book name from English
function getChineseBookName(englishBookName: string): string {
  // Remove any leading numbers and spaces (e.g., "1 John" -> "John")
  const cleanBookName = englishBookName.replace(/^\d+\s*/, '');
  return bibleBookTranslations[cleanBookName] || englishBookName;
}

// Function to format reference for Bible API
function formatReferenceForAPI(reference: string, isChinese: boolean = false): string {
  // Extract book name and chapter/verse
  const match = reference.match(/^([\d\s]*[A-Za-z]+)\s+(.+)$/);
  if (!match) return reference.replace(/\s+/g, '-');
  
  const bookName = match[1].trim();
  const chapterVerse = match[2];
  
  // For Chinese content, use the Chinese book name
  if (isChinese) {
    const chineseBookName = getChineseBookName(bookName);
    // For single-chapter books, format as "book+verse" (lowercase, with plus sign)
    if (singleChapterBooks.includes(bookName)) {
      // Remove the chapter number if it's "1:" or just "1"
      const formattedChapterVerse = chapterVerse.replace(/^1:?/, '');
      // Convert to lowercase and use plus sign instead of hyphen
      return `${chineseBookName.toLowerCase()}+${formattedChapterVerse}`;
    }
    
    // For other books, just replace spaces with hyphens
    return `${chineseBookName} ${chapterVerse}`.replace(/\s+/g, '-');
  }
  
  // For English content, use the original logic
  if (singleChapterBooks.includes(bookName)) {
    // Remove the chapter number if it's "1:" or just "1"
    const formattedChapterVerse = chapterVerse.replace(/^1:?/, '');
    // Convert to lowercase and use plus sign instead of hyphen
    return `${bookName.toLowerCase()}+${formattedChapterVerse}`;
  }
  
  // For other books, just replace spaces with hyphens
  return reference.replace(/\s+/g, '-');
}

// Function to fetch verse content from Bible API
async function fetchVerseContent(reference: string, isChinese: boolean = false) {
  try {
    const formattedReference = formatReferenceForAPI(reference, isChinese);
    console.log("Fetching from Bible API:", formattedReference, isChinese ? "(Chinese)" : "(English)");
    
    // For Chinese content, use CUV translation
    const url = isChinese 
      ? `https://bible-api.com/${formattedReference}?translation=cuv`
      : `https://bible-api.com/${formattedReference}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch verse: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
      text: data.text,
      verses: data.verses,
      reference: data.reference
    };
  } catch (error) {
    console.error("Error fetching verse:", error);
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    console.log("Requested date:", date)

    if (!date) {
      return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('dailyBread')
      .select('*')
      .eq('date', date)
      .maybeSingle()

    if (error) {
      console.error('Error fetching daily bread:', error)
      return NextResponse.json({ error: 'Failed to fetch daily bread' }, { status: 500 })
    }

    console.log("Fetched data:", data)
    
    if (!data) {
      // Fetch default verse content from Bible API
      const defaultVerse = "John 3:16";
      const defaultContent = await fetchVerseContent(defaultVerse);
      const defaultContentZh = await fetchVerseContent(defaultVerse, true);
      
      return NextResponse.json({
        verse: defaultVerse,
        verse_zh: translateReference(defaultVerse),
        content: defaultContent?.text || "For God so loved the world...",
        content_zh: defaultContentZh?.text || "神爱世人...",
        date: date,
        verses: defaultContent?.verses || [],
        verses_zh: defaultContentZh?.verses || []
      });
    }

    // If we have data but no content, fetch from Bible API
    if (data.verse) {
      const content = await fetchVerseContent(data.verse);
      const contentZh = await fetchVerseContent(data.verse, true);

      
      return NextResponse.json({
        ...data,
        content: content?.text || data.content,
        verse_zh: translateReference(data.verse),
        content_zh: contentZh?.text || data.content_zh,
        verses: content?.verses || [],
        verses_zh: contentZh?.verses || []
      });
    }

    // Return the data with verses array
    return NextResponse.json({
      ...data,
      verses: [],
      verses_zh: []
    });
  } catch (error) {
    console.error('Error in daily bread route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 