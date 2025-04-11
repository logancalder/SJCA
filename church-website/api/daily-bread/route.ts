import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/utils/supabase/server';

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date');
  
  if (!date) {
    return NextResponse.json({ error: 'No date provided' }, { status: 400 });
  }

    // First check if the user exists in the database
    console.log("date: ", date);
    
    const { data: userData, error: userError } = await supabase
      .from('dailyBread')
      .select('*')
      .eq('date', date);
    
    if (userError) {
      console.log('No verses found');
      console.log(userError);
    return;}
    
    console.log('Verse found');
    return NextResponse.json(userData);
 
} 