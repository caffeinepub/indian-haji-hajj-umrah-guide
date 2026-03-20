import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Upload,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  useAddFlipbook,
  useGetFlipbooks,
  useIsAdmin,
} from "../hooks/useQueries";

// Static books always available
const STATIC_BOOKS = [
  {
    name: "HAJ-E-TAMATTU (Urdu)",
    author: "Saleemuddin Siddiqui",
    language: "Urdu",
    url: "/assets/uploads/HAJ-E-TAMATTU-URDU-BOOK-_compressed-1.pdf",
  },
  {
    name: "HAJ-E-TAMATTU (Hindi)",
    author: "Saleemuddin Siddiqui",
    language: "Hindi",
    url: "/assets/uploads/HAJ-E-TAMATTU-HINDI-BOOK_compressed-2.pdf",
  },
];

function FlipbookViewer({
  url,
  name,
  author,
}: {
  url: string;
  name: string;
  author?: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState<"left" | "right">("right");
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-foreground">
            {name}
          </h3>
          {author && (
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <User className="w-3 h-3" /> {author}
            </p>
          )}
        </div>
        <Badge className="bg-gold/20 text-gold border-gold/30">PDF</Badge>
      </div>

      <div
        className="relative bg-amber-50 rounded-xl overflow-hidden shadow-2xl border-2 border-amber-200"
        style={{ minHeight: "500px" }}
        data-ocid="flipbook.canvas_target"
      >
        {/* Book spine effect */}
        <div className="absolute inset-y-0 left-1/2 w-1 bg-amber-300 shadow-inner z-10" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{
              rotateY: direction === "right" ? -90 : 90,
              opacity: 0,
            }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{
              rotateY: direction === "right" ? 90 : -90,
              opacity: 0,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              transformOrigin:
                direction === "right" ? "left center" : "right center",
              transformStyle: "preserve-3d",
            }}
            className="w-full"
          >
            <iframe
              src={`${url}#page=${currentPage}`}
              className="w-full"
              style={{ height: "500px", border: "none" }}
              title={`${name} - Page ${currentPage}`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => {
            setDirection("left");
            setCurrentPage((p) => Math.max(1, p - 1));
          }}
          disabled={currentPage <= 1}
          className="border-emerald-dark text-emerald-dark hover:bg-emerald-dark hover:text-white"
          data-ocid="flipbook.pagination_prev"
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Pichla
        </Button>
        <span className="text-muted-foreground text-sm font-medium">
          Page {currentPage}
        </span>
        <Button
          variant="outline"
          onClick={() => {
            setDirection("right");
            setCurrentPage((p) => p + 1);
          }}
          className="border-emerald-dark text-emerald-dark hover:bg-emerald-dark hover:text-white"
          data-ocid="flipbook.pagination_next"
        >
          Agla <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  );
}

export default function Flipbook() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bookName, setBookName] = useState("");
  const [activeBook, setActiveBook] = useState<{
    type: "static" | "dynamic";
    index: number;
  } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { data: flipbooks = [], isLoading } = useGetFlipbooks();
  const { data: isAdmin = false } = useIsAdmin();
  const addFlipbook = useAddFlipbook();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setBookName(file.name.replace(".pdf", ""));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !bookName) {
      toast.error("File aur naam dono zaroori hain");
      return;
    }
    try {
      setUploadProgress(10);
      await addFlipbook.mutateAsync({
        name: bookName,
        file: selectedFile,
        pageCount: 1,
      });
      setUploadProgress(100);
      toast.success("Flipbook upload ho gaya!");
      setSelectedFile(null);
      setBookName("");
      setUploadProgress(0);
    } catch {
      toast.error("Upload failed. Dobara koshish karein.");
      setUploadProgress(0);
    }
  };

  const getActiveViewer = () => {
    if (!activeBook) return null;
    if (activeBook.type === "static") {
      const book = STATIC_BOOKS[activeBook.index];
      return (
        <FlipbookViewer url={book.url} name={book.name} author={book.author} />
      );
    }
    const book = flipbooks[activeBook.index];
    if (!book) return null;
    return <FlipbookViewer url={book.url.getDirectURL()} name={book.name} />;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-emerald-dark relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('/assets/generated/islamic-pattern-bg.dim_400x400.png')",
            backgroundSize: "200px",
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
              PDF Viewer
            </Badge>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
              Flipbook
            </h1>
            <p className="text-white/70 text-lg">
              Hajj aur Umrah ki guide books online padho — page-turn animation
              ke saath
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 pb-16">
        {/* Admin Upload */}
        {isAdmin && (
          <Card className="mb-8 border-2 border-dashed border-gold/40 bg-gold/5">
            <CardContent className="p-8">
              <h3 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-gold" /> PDF Upload (Admin)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="book-name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Kitab ka Naam
                  </label>
                  <input
                    id="book-name"
                    type="text"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    placeholder="Hajj Guide 2024"
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                    data-ocid="flipbook.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pdf-file"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    PDF File
                  </label>
                  <button
                    type="button"
                    className="w-full border-2 border-dashed border-border rounded-lg px-4 py-3 cursor-pointer hover:border-gold/40 transition-colors text-sm text-muted-foreground text-center"
                    onClick={() => fileRef.current?.click()}
                    data-ocid="flipbook.dropzone"
                  >
                    {selectedFile ? selectedFile.name : "PDF file chunein"}
                  </button>
                  <input
                    id="pdf-file"
                    ref={fileRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div
                  className="mb-3 h-2 bg-border rounded-full overflow-hidden"
                  data-ocid="flipbook.loading_state"
                >
                  <div
                    className="h-full bg-gold transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
              <Button
                onClick={handleUpload}
                disabled={addFlipbook.isPending}
                className="bg-emerald-dark text-white hover:opacity-90"
                data-ocid="flipbook.upload_button"
              >
                {addFlipbook.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Upload Ho
                    Raha Hai...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" /> Upload Karo
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Static Books */}
        <div className="mb-10">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
            Hamare Publications
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Saleemuddin Siddiqui dwara likhi gayi kitabein
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {STATIC_BOOKS.map((book, i) => {
              const isActive =
                activeBook?.type === "static" && activeBook.index === i;
              return (
                <Card
                  key={book.name}
                  className={`cursor-pointer transition-all border-2 hover:shadow-lg ${
                    isActive
                      ? "border-gold bg-gold/5 shadow-md"
                      : "border-border hover:border-gold/40"
                  }`}
                  onClick={() => setActiveBook({ type: "static", index: i })}
                  data-ocid={`flipbook.item.${i + 1}`}
                >
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-12 h-16 bg-emerald-dark rounded-md flex items-center justify-center flex-shrink-0 shadow">
                      <BookOpen className="w-6 h-6 text-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge
                        className={`mb-2 text-xs ${
                          book.language === "Urdu"
                            ? "bg-emerald-dark/10 text-emerald-dark border-emerald-dark/20"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }`}
                      >
                        {book.language}
                      </Badge>
                      <h3 className="font-serif font-bold text-foreground text-base leading-tight mb-1">
                        {book.name}
                      </h3>
                      <p className="text-muted-foreground text-xs flex items-center gap-1">
                        <User className="w-3 h-3" /> {book.author}
                      </p>
                    </div>
                    {isActive && (
                      <Badge className="bg-gold text-white border-0 text-xs">
                        Open
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Viewer for static books */}
        {activeBook?.type === "static" && (
          <Card className="mb-10">
            <CardContent className="p-6">{getActiveViewer()}</CardContent>
          </Card>
        )}

        {/* Admin-uploaded Books */}
        {isLoading ? (
          <div className="text-center py-10" data-ocid="flipbook.loading_state">
            <Loader2 className="w-10 h-10 animate-spin mx-auto text-emerald-dark" />
            <p className="text-muted-foreground mt-4">
              Kitabein load ho rahi hain...
            </p>
          </div>
        ) : flipbooks.length > 0 ? (
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                Admin ki Uploaded Kitabein
              </h3>
              <div className="flex flex-wrap gap-3">
                {flipbooks.map((book, i) => (
                  <Button
                    key={book.name}
                    variant={
                      activeBook?.type === "dynamic" && activeBook.index === i
                        ? "default"
                        : "outline"
                    }
                    onClick={() => setActiveBook({ type: "dynamic", index: i })}
                    className={
                      activeBook?.type === "dynamic" && activeBook.index === i
                        ? "bg-emerald-dark text-white"
                        : "border-emerald-dark text-emerald-dark hover:bg-emerald-dark/5"
                    }
                    data-ocid={`flipbook.item.${STATIC_BOOKS.length + i + 1}`}
                  >
                    <BookOpen className="w-4 h-4 mr-2" /> {book.name}
                  </Button>
                ))}
              </div>
            </div>
            {activeBook?.type === "dynamic" && (
              <Card>
                <CardContent className="p-6">{getActiveViewer()}</CardContent>
              </Card>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
