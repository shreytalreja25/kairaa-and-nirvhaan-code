def canConstruct(s,k):
        """
        :type s: str
        :type k: int
        :rtype: bool
        """
        flag = False
        palins = list()
        palin_word = list()
        counter = 0
        chars = list()
        def isPalin(word):
            n = len(word)
            count = 0 
            for i in range(n//2):
                if word[i] == word[n-i-1]:
                    count += 1
            if count == n//2:
                return True
            else:
                return False
        for i in range(len(s)):
            chars.append(s[i])
        for x in range(len(chars)):
            for y in range(x,len(chars)):
                palins.append(chars[x:y])
        for z in palins:
            word = ""
            for a in z:
                word += a
            palin_word.append(word)
        print(palin_word)
        for wd in palin_word:
            if isPalin(wd) and len(wd)>0:
                counter += 1
        if counter == k:
            return True
        else:
            return False

canConstruct("RACECAR",3)