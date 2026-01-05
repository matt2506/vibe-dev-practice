import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'db.json');

export async function GET() {
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const data = JSON.parse(fileContents);
        return Response.json(data);
    } catch (error) {
        return Response.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        // Here we expect the body to be the full data object to replace the db
        // In a real app we might validate or patch, but for this file-based db we overwrite.
        await fs.writeFile(dataFilePath, JSON.stringify(body, null, 2), 'utf8');
        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
