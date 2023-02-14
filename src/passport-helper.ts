import { Request } from "express";
import { JwtFromRequestFunction } from "passport-jwt";

export function GetCookieExtractor(cookiename: string) {
	return (req: Request) => {
		if (req && req.cookies) 
			return req.cookies[cookiename];
		return null;
	}
};

export function CombinedExtractor(...extractFns: JwtFromRequestFunction[]): JwtFromRequestFunction{
    return (req) => {
        let result: string | null = null;
        for(const fn of extractFns){
            result = fn(req);
            if(result != null)
                break;
        }
        return result;
    }
}
